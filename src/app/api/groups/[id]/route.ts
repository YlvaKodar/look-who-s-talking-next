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

    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });


    const { id } = await params;

    const group = await prisma.group.findUnique({
        where: { id }
    });

    if (!group) return NextResponse.json({ error: "Group not found" }, { status : 404 });


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
    const { keeperId, name, description, newClocker, removedClocker } = await request.json()

    const group = await prisma.group.findUnique({
        where: { id },
    });

    if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });

    if (group.keeperId !== session.user.id && session.user.role !== "ADMIN") return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });

    const data: GroupUpdateInput = {};
    if (keeperId) data.keeper = keeperId;
    if (name) data.name = name;
    // if (description !== undefined) data.description = description;
    if (description) data.description = description;

    const updatedGroup = await prisma.group.update({
        where: { id },
        data
    })

    if (newClocker) {
        await prisma.groupClocker.create({
            data: {
                userId: newClocker,
                groupId: id,
            }
        })
    }

    if (removedClocker) {
        await prisma.groupClocker.delete({
            where: {
                userId_groupId: {
                    userId: removedClocker,
                    groupId: id,
                }
            }
        })
    }

    return NextResponse.json(updatedGroup, { status: 200 });
}

export async function DELETE(
    request: Request,
    { params }  : { params: Promise<{ id: string }> }
){
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { id } = await params;

    const group = await prisma.group.findUnique({
        where: { id }
    });

    if (!group) return NextResponse.json({ error: "Group not found" }, { status : 404 });

    if (session.user.role === "ADMIN" || group.keeperId === session.user.id){
        const deletedGroup = await prisma.group.delete({
            where: { id },
        })
        return NextResponse.json(deletedGroup, { status: 200 });
    }else {
        return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
    }
}