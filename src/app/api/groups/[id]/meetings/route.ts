import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {MeetingListItem} from "@/types/meeting";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;

    const rawMeetings = await prisma.meeting.findMany({
        where: { groupId: id },
        select: {
            id: true,
            title: true,
            startedAt: true
        },
        orderBy: {
            startedAt: "asc"
        }
    });

    const meetings: MeetingListItem[] = rawMeetings.map((meeting) => ({
        id: meeting.id,
        title: meeting.title,
        startedAt: meeting.startedAt
    }))
    return NextResponse.json(meetings);
}