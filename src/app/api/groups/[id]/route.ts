import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

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