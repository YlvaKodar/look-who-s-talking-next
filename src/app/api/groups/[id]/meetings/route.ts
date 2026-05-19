import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {MeetingListItem} from "@/types/meeting";
import { unstable_cache } from 'next/cache';

function getCachedMeetings(id: string) {
    return unstable_cache(
        async () => {
            const rawMeetings = await prisma.meeting.findMany({
                where: { groupId: id },
                select: {
                    id: true,
                    title: true,
                    startedAt: true
                },
                orderBy: { startedAt: "asc" }
            });

            return rawMeetings.map((meeting) => ({
                id: meeting.id,
                title: meeting.title,
                startedAt: meeting.startedAt.toLocaleDateString("sv-SE")
            })) as MeetingListItem[];
        },
        [`group-meetings-${id}`],
        { tags: [`group-meetings-${id}`], revalidate: 300 }
    )()
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;

    try {
        const meetings = await getCachedMeetings(id);
        return NextResponse.json(meetings);
    } catch (error) {
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 });
    }
}