import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function GET( request: Request ) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const url = new URL(request.url)
    const query = url.searchParams.get("q");

    if (query) {
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } }
                ]
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        })
        return NextResponse.json(users)
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