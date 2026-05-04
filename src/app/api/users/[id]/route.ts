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

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
        }
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status : 404 });
    }

    return NextResponse.json(user);
}