import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {revalidateTag} from "next/cache";
import {Prisma} from "@/generated/prisma/client";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;

    const meeting = await prisma.meeting.findUnique({
        where: { id },
        include: {
            group: { select: { keeperId: true } },
        },
    });
    if (!meeting) return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
    if (!meeting.group) return NextResponse.json({ error: "Meeting has no group to transfer to." }, { status: 400 });
    if (session.user.role !== "ADMIN" && meeting.clockerId !== session.user.id) return NextResponse.json({ error: "THIS DECISION IS NOT UP TO YOU" }, { status: 403 });
    if (meeting.clockerId === meeting.group.keeperId) return NextResponse.json({ error: "Group keeper is already meeting clocker." }, { status: 400 });

    try {
        await prisma.meeting.update({
            where: { id },
            data: { clocker: { connect: { id: meeting.group.keeperId } } },
        });
        revalidateTag(`meeting-${id}`)
        revalidateTag(`meetings-${meeting.clockerId}`);
        revalidateTag(`meetings-${meeting.group.keeperId}`);
        return NextResponse.json({message: "Meeting clocker updated!"}, { status: 200 });
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Error code:', error.code);
            console.log('Error meta:', error.meta);
            if (error.code === "P2025") return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or group does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}