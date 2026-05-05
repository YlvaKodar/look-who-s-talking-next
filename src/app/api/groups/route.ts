import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET( request: Request ) {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) {
        return NextResponse.json({error: "No such session"}, { status: 401 });
    }

    const url = new URL(request.url)
    const status = url.searchParams.get("status");

    if (status && status === "keeper") {
        const groups = await prisma.group.findMany({
            where: {keeperId: session.user.id}
        });

        return NextResponse.json(groups);
    }

    if (status && status === "clocker") {
        const groups = await prisma.group.findMany({
            where: {
                clockers: {
                    some: {
                        userId: session.user.id}}
            }
        });

        return NextResponse.json(groups);
    }

    const groups = await prisma.group.findMany();

    return NextResponse.json(groups);
}
export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) {
        return NextResponse.json({error: "No such session"}, { status: 401 });
    }
    const groupData = await request.json();

    const newGroup = await prisma.group.create({
        data: {
            ...groupData,
            keeperId: session.user.id
        }
    });

    return NextResponse.json(newGroup, { status: 201 });
}
