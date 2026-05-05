import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {GroupUpdateInput} from "@/generated/prisma/models/Group";

export async function GET(
    request: Request,
    { params }  : { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.json({ error: "No such session" }, { status: 401 });
    }

    const { id } = await params;

    const group = await prisma.group.findUnique({
        where: { id }
    });

    if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status : 404 });
    }

    return NextResponse.json(group);
}
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;
    const { creatorId, name, description, newClocker, removedClocker } = await request.json()

    const group = await prisma.group.findUnique({
        where: { id },
    });

    if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });

    if (group.creatorId !== session.user.id && session.user.role !== "ADMIN") return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });

    const data: GroupUpdateInput = {};
    if (creatorId) data.creator = creatorId;
    if (name) data.name = name;
    // if (description !== undefined) data.description = description;
    if (description) data.description = description;

    const updatedGroup = await prisma.group.update({
        where: { id },
        data
    })

    if (newClocker) {
        await prisma.group.update({
            where: { id },
            data: { klockers: { connect: { id: newClocker } } }
        })
    }

    if (removedClocker) {
        await prisma.group.update({
            where: { id },
            data: { klockers: { disconnect: { id: removedClocker } } }
        })
    }

    return NextResponse.json(updatedGroup, { status: 200 });
}
