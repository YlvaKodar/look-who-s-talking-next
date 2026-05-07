import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";

export async function GET() {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const meetings = await prisma.meeting.findMany({
        where: {keeperId: session.user.id}
    });

    return NextResponse.json(meetings);
}

export async function POST(request: Request) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const meetingData = await request.json();
    if (!meetingData) return NextResponse.json({error: "No data provided"})

    try {
        const newMeeting = await prisma.meeting.create({
            data: {
                ...meetingData,
                keeperId: session.user.id
            }
        });
        return NextResponse.json(newMeeting, { status: 201 });
    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2006" || error.code === "P2007") return NextResponse.json({ error: "Invalid field format." }, { status : 400 });
            if (error.code === "P2002") return NextResponse.json({ error: "The user might already keep a meeting with this start time." }, { status : 409 });
            if (error.code === "P2011") return NextResponse.json({ error: "A required field is missing." }, { status : 400 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or group does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so ths didn't go as planned ..." }, { status: 500 })
    }
}