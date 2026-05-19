import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";
import {MeetingUpdateInput} from "@/generated/prisma/models/Meeting";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

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

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;
    const { groupId, keeperId } = await request.json()

    const data: MeetingUpdateInput = {};
    if (keeperId) data.keeper = { connect: { id: keeperId } };
    if (groupId !== undefined) {
        data.group = groupId === null ? { disconnect: true } : { connect: { id: groupId } };
    }

    if (!(Object.keys(data).length)) return NextResponse.json({ error: "No data provided" }, { status: 400 });

    if (session.user.role !== "ADMIN") {
        const meeting = await prisma.meeting.findUnique({
            where: { id }
        });
        if (!meeting) return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
        if (meeting.keeperId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
        if (meeting.groupId && data.group !== undefined) return NextResponse.json({error: "Only admin may update or remove existing meeting group."}, { status: 403 });
    }

    try {
        const updatedMeeting = await prisma.meeting.update({
            where: { id },
            data
        });
        return NextResponse.json(updatedMeeting, { status: 200 });
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.log('Error code:', error.code);
            console.log('Error meta:', error.meta);
            if (error.code === "P2025") {
                if (error.meta?.model === "User") return NextResponse.json({ error: "The new keeper does not exist." }, { status: 400 });
                if (error.meta?.model === "Group") return NextResponse.json({ error: "The new group does not exist." }, { status: 400 });
                return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
            }
            if (error.code === "P2002") return NextResponse.json({ error: "The user may already keep a meeting starting at this time." }, { status : 409 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or group does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;

    if (session.user.role !== "ADMIN") {
        const meeting = await prisma.meeting.findUnique({
            where: { id }
        });

        if (!meeting) return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
        if (meeting.keeperId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
        if (meeting.groupId) return NextResponse.json({error: "A meeting within a group may only be deleted by admin user."}, { status: 403 });
    }

    try {
        const deletedMeeting = await prisma.meeting.delete({
            where: { id }
        })
        return NextResponse.json(deletedMeeting, { status: 200});

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
            if (error.code === "P2003") return NextResponse.json({ error: "Meeting cannot be deleted"}, { status : 409 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}