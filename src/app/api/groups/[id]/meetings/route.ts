import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;

    const meetings = await prisma.meeting.findMany({
        where: { groupId: id },
        orderBy: {
            startedAt: "asc"
        }
    });

    return NextResponse.json(meetings);
}