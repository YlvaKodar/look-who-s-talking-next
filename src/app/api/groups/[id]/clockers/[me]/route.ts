import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";
import { revalidateTag } from 'next/cache';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;

    try{
        const removedClocker = await prisma.groupClocker.delete({
            where: {
                userId_groupId: {
                    userId: session.user.id,
                    groupId: id,
                }
            }
        });
        revalidateTag(`groups-myGroups-${session.user.id}`);
        revalidateTag(`group-clockers-${id}`);
        return NextResponse.json({ message: "Clocker removed"}, {status: 200});

    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "Clocker not found" }, { status : 404 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or group does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}