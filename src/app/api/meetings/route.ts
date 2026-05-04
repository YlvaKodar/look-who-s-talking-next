import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) {
        return NextResponse.json({error: "No such session"}, { status: 401 });
    }
    const meetings = await prisma.meeting.findMany({
        where: {creatorId: session.user.id}
    });

    return NextResponse.json(meetings);
}

export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) {
        return NextResponse.json({error: "No such session"}, { status: 401 });
    }
    const meetingData = await request.json();

    const newMeeting = await prisma.meeting.create({
        data: {
            ...meetingData,
            creatorId: session.user.id
        }
    });

    return NextResponse.json(newMeeting, { status: 201 });
}