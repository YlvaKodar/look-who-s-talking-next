import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {revalidateTag} from "next/cache";
import {Prisma} from "@/generated/prisma/client";

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;
    const { groupId } = await request.json();
    if (!groupId) return NextResponse.json({ error: "No data provided" }, { status: 400 });

    if (session.user.role !== "ADMIN") {
        const meeting = await prisma.meeting.findUnique({
            where: { id }
        });
        if (!meeting) return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
        if (meeting.clockerId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
        if (meeting.groupId) return NextResponse.json({error: "Only admin may update or remove existing meeting group."}, { status: 403 });
    }

    try {
        await prisma.meeting.update({
            where: { id },
            data: { group: { connect: { id: groupId } } },
        });
        revalidateTag(`meeting-${id}`)
        revalidateTag(`group-${groupId}`);
        return NextResponse.json({message: "Meeting group added!"}, { status: 200 });
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Error code:', error.code);
            console.log('Error meta:', error.meta);
            if (error.code === "P2025") {
                if (error.meta?.model === "Group") return NextResponse.json({ error: "The new group does not exist." }, { status: 400 });
                return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
            }
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or group does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}