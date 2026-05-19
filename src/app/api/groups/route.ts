import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";
import { GroupListItem } from "@/types/group"
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';

const groupSelect = {
    id: true,
    name: true,
    description: true,
} satisfies Prisma.GroupSelect;

 function getCashedGroups(where: Prisma.GroupWhereInput, cacheKey: string ){
     return unstable_cache(
        async () => {
            const groups = await prisma.group.findMany({
                where,
                select: groupSelect,
            }) as GroupListItem[];
            return groups;
        },
         [`groups-${cacheKey}`],
         { tags: [`groups-${cacheKey}`], revalidate: 300 }
     )()
 }

export async function GET( request: Request ) {
    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const url = new URL(request.url)
    const status = url.searchParams.get("status");

    let where: Prisma.GroupWhereInput = {};
    let cacheKey: string;

    if (status === "keeper") {
        where = { keeperId: session.user.id };
        cacheKey = `keeper-${session.user.id}`;
    } else if (status === "clocker") {
        where = { clockers: { some: { userId: session.user.id } } };
        cacheKey = `clocker-${session.user.id}`;
    } else if (status === "myGroups") {
        where = {
            OR: [
                { keeperId: session.user.id },
                { clockers: { some: { userId: session.user.id } } }
            ]
        };
        cacheKey = `myGroups-${session.user.id}`;
    } else if (session.user.role === "ADMIN") {
        where = {};
        cacheKey = `all`;
    } else {
        return NextResponse.json({ error: "Invalid status or user role!" }, { status: 400 });
    }

    const groups = await getCashedGroups(where, cacheKey);

    return NextResponse.json(groups);
}

export async function POST(request: Request) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const groupData = await request.json();

    if (!groupData) return NextResponse.json({ error: "No data provided" }, { status: 400 });

    try {
        const newGroup = await prisma.group.create({
            data: {
                ...groupData,
                keeperId: session.user.id
            }
        });
        revalidateTag(`groups-keeper-${session.user.id}`)
        revalidateTag(`groups-myGroups-${session.user.id}`)
        return NextResponse.json(newGroup, { status: 201 });
    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2006" || error.code === "P2007") return NextResponse.json({ error: "Invalid field format." }, { status : 400 });
            if (error.code === "P2002") return NextResponse.json({ error: "The user might already keep a group by this name." }, { status : 409 });
            if (error.code === "P2011") return NextResponse.json({ error: "A required field is missing." }, { status : 400 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or meeting does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}
