import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";
import { UserListItem } from "@/types/user";
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache'

function getCachedClockers(id: string){
    return unstable_cache(
            async () => {
                const rawClockers = await prisma.groupClocker.findMany({
                    where: {groupId: id},
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            }
                        }
                    }
                })

                const clockers: UserListItem[] = rawClockers.map(clocker => ({
                    id: clocker.user.id,
                    name: clocker.user.name,
                    email: clocker.user.email,
                }));

                return clockers;
            },
            [`group-clockers-${id}`],
            { tags: [`group-clockers-${id}`], revalidate: 300 }
    )()
}

export async function GET (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;
    const clockers = await getCachedClockers(id);

    return NextResponse.json(clockers)
}

export async function POST (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { add }: { add?: string[] } = await request.json();
    if (!(add?.length)) return NextResponse.json({error: "No data provided"})

    const { id } = await params;

    try{
        const newClockers = await prisma.groupClocker.createMany({
            data: add.map(userId => ({
                userId,
                groupId: id,
            })),
            skipDuplicates: true,
        })

        revalidateTag(`group-clockers-${id}`)
        return NextResponse.json({message: "Clockers added: " +newClockers.count}, {status: 200});

    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2006" || error.code === "P2007") return NextResponse.json({ error: "Invalid field format." }, { status : 400 });
            if (error.code === "P2011") return NextResponse.json({ error: "A required field is missing." }, { status : 400 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or group does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}

export async function DELETE (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { remove }: { remove?: string[] } = await request.json();
    if (!(remove?.length)) return NextResponse.json({ error: "No data provided" }, { status: 400 });

    const { id } = await params;

    if (session.user.role !== "ADMIN") {
        const group = await prisma.group.findUnique({
            where: { id }
        });

        if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });
        if (group.keeperId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
    }

    try{
        const removedClockers = await prisma.groupClocker.deleteMany({
            where: {
                groupId: id,
                userId: { in: remove },
            },
        })

        if (removedClockers.count === 0) return NextResponse.json({ error: "No matching clockers found" }, { status: 404 });

        revalidateTag(`group-clockers-${id}`)
        return NextResponse.json({ message: "Clockers removed", count: removedClockers.count }, {status: 200});

    } catch (error){
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}