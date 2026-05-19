import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";
import { unstable_cache } from 'next/cache';
import { revalidateTag } from 'next/cache';
import {MeetingUpdateInput} from "@/generated/prisma/models/Meeting";
import {createPastMeetingStats} from "@/utils/meetingUtil";


function getCachedMeeting(id: string) {
    return unstable_cache(
        async () => {
            const raw = await prisma.meeting.findUnique({
                where: { id },
                include: {
                    group: { select: { name: true } },
                    keeper: { select: { name: true } },
                }
            });

            if (!raw) return null;

            return createPastMeetingStats(
                raw.id,
                raw.title,
                raw.group?.name ?? "",
                raw.keeper.name,
                raw.createdAt,
                raw.womenCount,
                raw.womenSpeakingTime,
                raw.womenStatementCount,
                raw.nonbinaryCount,
                raw.nonbinarySpeakingTime,
                raw.nonbinaryStatementCount,
                raw.menCount,
                raw.menSpeakingTime,
                raw.menStatementCount,
            );
        },
        [`meeting-${id}`],
        { tags: [`meeting-${id}`]}
    )()
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;

    try {
        const meetings = await getCachedMeeting(id);
        return NextResponse.json(meetings);
    } catch (error) {
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 });
    }
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
        await prisma.meeting.update({
            where: { id },
            data
        });
        revalidateTag(`meeting-${id}`)
        return NextResponse.json({message: "Meeting updated!"}, { status: 200 });
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
        await prisma.meeting.delete({
            where: { id }
        })
        revalidateTag(`meeting-${id}`)
        return NextResponse.json({message: "Meeting updated!"}, { status: 200});

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "Meeting not found" }, { status : 404 });
            if (error.code === "P2003") return NextResponse.json({ error: "Meeting cannot be deleted"}, { status : 409 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}