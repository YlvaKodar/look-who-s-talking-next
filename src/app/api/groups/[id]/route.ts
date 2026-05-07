import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import {GroupUpdateInput} from "@/generated/prisma/models/Group";
import {Prisma} from "@/generated/prisma/client";

export async function GET(
    request: Request,
    { params }  : { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
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

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;
    const { keeperId, name, description } = await request.json()
    const data: GroupUpdateInput = {};

    if (session.user.role !== "ADMIN") {
        const group = await prisma.group.findUnique({
            where: { id },
        });

        if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });
        if (group.keeperId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
    }

    if (keeperId) data.keeper = keeperId;
    if (name) data.name = name;
    if (description !== undefined) data.description = description;

    if (!(Object.keys(data).length)) return NextResponse.json({error: "No data provided"})

    try {
        const updatedGroup = await prisma.group.update({
            where: { id },
            data
        })
        return NextResponse.json(updatedGroup, { status: 200 });
    } catch(error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "Group not found" }, { status : 404 });
            if (error.code === "P2002") return NextResponse.json({ error: "The user may already keep a group with this name." }, { status : 409 });
            if (error.code === "P2003") return NextResponse.json({ error: "A referenced user does not exist." }, { status : 400 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }  : { params: Promise<{ id: string }> }
){

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;

    if (session.user.role !== "ADMIN"){
        const group = await prisma.group.findUnique({
            where: { id }
        });

        if (!group) return NextResponse.json({ error: "Group not found" }, { status : 404 });
        if (group.keeperId === session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
    }

    try {
        const deletedGroup = await prisma.group.delete({
            where: { id },
        })
        return NextResponse.json(deletedGroup, { status: 200 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "Group not found" }, { status : 404 });
            if (error.code === "P2003") return NextResponse.json({ error: "Group cannot be deleted"}, { status : 409 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}