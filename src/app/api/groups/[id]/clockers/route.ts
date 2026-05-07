import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@/generated/prisma/client";

export async function GET (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;

    const clockers = await prisma.groupClocker.findMany({
        where: {groupId: id}
    })

    return NextResponse.json(clockers)
}

export async function POST (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { add }: { add?: string[] } = await request.json();
    if (!(add?.length)) return NextResponse.json({error: "No data provided"})

    const { id } = await params;

    try{
        const newClockers = await prisma.groupClocker.createMany({
            data: add.map(userId => ({
                userId,
                groupId: id,
            })),
            skipDuplicates: true,
        })

        return NextResponse.json("Clockers added: " + newClockers.count, {status: 200});

    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2006" || error.code === "P2007") return NextResponse.json({ error: "Invalid field format." }, { status : 400 });
            if (error.code === "P2011") return NextResponse.json({ error: "A required field is missing." }, { status : 400 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user or group does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}

export async function DELETE (
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { remove }: { remove?: string[] } = await request.json();
    if (!(remove?.length)) return NextResponse.json({error: "No data provided"})

    const { id } = await params;

    if (session.user.role !== "ADMIN") {
        const group = await prisma.group.findUnique({
            where: { id }
        });

        if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });
        if (group.keeperId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
    }

    try{
        const removedClockers = await prisma.groupClocker.deleteMany({
            where: {
                groupId: id,
                userId: { in: remove },
            },
        })

        if (removedClockers.count === 0) return NextResponse.json({ error: "No matching clockers found" }, { status: 404 });

        return NextResponse.json( "Clockers removed: " + removedClockers.count, {status: 200});

    } catch (error){
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}