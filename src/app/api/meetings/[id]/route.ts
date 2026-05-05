import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;

    const meeting = await prisma.meeting.findUnique({
        where: { id }
    });

    if (!meeting) return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    return NextResponse.json(meeting);
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    if (session.user.role !== "ADMIN") return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });

    const { id } = await params;
    const { groupId } = await request.json()

    const meeting = await prisma.meeting.findUnique({
        where: { id }
    });

    if (!meeting) return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    const updatedMeeting = await prisma.meeting.update({
        where: { id },
        data: { groupId }
    });

    return NextResponse.json(updatedMeeting, { status: 200 });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;

    const meeting = await prisma.meeting.findUnique({
        where: { id }
    });

    if (!meeting) return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    if (session.user.role === "ADMIN" || (meeting.creatorId === session.user.id && !meeting.groupId) ){
        const deletedMeeting = await prisma.meeting.delete({
            where: { id }
        })
        return NextResponse.json(deletedMeeting, { status: 200});
    } else {
        return NextResponse.json({error: "A meeting within a group may only be deleted by admin user. Other meetings may only be deleted by meeting creators."}, { status: 403 });
    }
}