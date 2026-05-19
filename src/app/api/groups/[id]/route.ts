import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { GroupUpdateInput } from "@/generated/prisma/models/Group";
import { Prisma } from "@/generated/prisma/client";
import { GroupPageItem } from "@/types/group";
import {UserListItem} from "@/types/user";
import { revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';

function getCachedGroup(id: string) {
    return unstable_cache(
        async () => {
            const rawGroup = await prisma.group.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    createdAt: true,
                    keeper: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                },
            });

            if (!rawGroup) return null;

            const keeper: UserListItem = { id: rawGroup.keeper.id, name: rawGroup.keeper.name };
            return { ...rawGroup, createdAt: rawGroup.createdAt.toLocaleDateString("sv-SE") ,keeper } as GroupPageItem;
        },
        [`group-${id}`],
        { tags: [`group-${id}`], revalidate: 300 }
    )()
}
export async function GET(
    request: Request,
    { params }  : { params: Promise<{ id: string }> }
) {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const { id } = await params;
    try {
        const group = await getCachedGroup(id);
        if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });
        return NextResponse.json(group);
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
    const { keeperId, name, description } = await request.json()
    const data: GroupUpdateInput = {};

    if (keeperId) data.keeper = keeperId;
    if (name) data.name = name;
    if (description !== undefined) data.description = description;

    if (!(Object.keys(data).length)) return NextResponse.json({ error: "No data provided" }, { status: 400 });

    if (session.user.role !== "ADMIN") {
        const group = await prisma.group.findUnique({
            where: { id },
        });

        if (!group) return NextResponse.json({ error: "Group not found" }, { status: 404 });
        if (group.keeperId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
    }

    try {
        const updatedGroup = await prisma.group.update({
            where: { id },
            data
        })
        if (session.user.role !== "ADMIN") {
            revalidateTag(`groups-keeper-${session.user.id}`);
            revalidateTag(`groups-myGroups-${session.user.id}`);
        } else {
            revalidateTag(`groups-all`);
        }
        revalidateTag(`group-${id}`)
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
        if (group.keeperId !== session.user.id) return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });
    }

    try {
        const deletedGroup = await prisma.group.delete({
            where: { id },
        });
        if (session.user.role !== "ADMIN") {
            revalidateTag(`groups-keeper-${session.user.id}`);
            revalidateTag(`groups-myGroups-${session.user.id}`);
        } else {
            revalidateTag(`groups-all`);
        }
        revalidateTag(`group-${id}`);
        return NextResponse.json({ message: "Group deleted"}, {status: 200});
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "Group not found" }, { status : 404 });
            if (error.code === "P2003") return NextResponse.json({ error: "Group cannot be deleted"}, { status : 409 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}