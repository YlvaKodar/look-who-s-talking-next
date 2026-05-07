import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";

export async function GET( request: Request ) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const url = new URL(request.url)
    const status = url.searchParams.get("status");

    if (status && status === "keeper") {
        const groups = await prisma.group.findMany({
            where: {keeperId: session.user.id}
        });

        return NextResponse.json(groups);
    }

    if (status && status === "clocker") {
        const groups = await prisma.group.findMany({
            where: {
                clockers: {
                    some: {
                        userId: session.user.id}}
            }
        });

        return NextResponse.json(groups);
    }

    if (session.user.role === "ADMIN") {
        const groups = await prisma.group.findMany();
        return NextResponse.json(groups);
    }
    return NextResponse.json({error: "No groups found for this user"}, { status: 403 })
}

export async function POST(request: Request) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const groupData = await request.json();

    if (!groupData) return NextResponse.json({error: "No data provided"})

    try {
        const newGroup = await prisma.group.create({
            data: {
                ...groupData,
                keeperId: session.user.id
            }
        });
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
