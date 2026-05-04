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
    const name = url.searchParams.get("name");

    if (name) {
        const users = await prisma.user.findMany({
            where: {name},
            select: {
                id: true,
                email: true,
                name: true,
            }
        })
        return NextResponse.json(users)
    }

    const email = url.searchParams.get("email");

    if (email) {
        const user = await prisma.user.findUnique({
            where: {email},
            select: {
                id: true,
                email: true,
                name: true,
            }
        })
        return NextResponse.json(user)
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
        }
    });

    return NextResponse.json(users);
}