import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { UserListItem } from "@/types/user";

export async function GET( request: Request ) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const url = new URL(request.url)
    const query = url.searchParams.get("q");
    const excludeParam = url.searchParams.get("exclude");
    const excludeIds = excludeParam ? excludeParam.split(",") : [];

    if (query) {
        const rawUsers = await prisma.user.findMany({
            where: {
                ...(query && {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        { email: { contains: query, mode: "insensitive" } },
                    ],
                }),
                NOT: {
                    id: { in: excludeIds },
                },
            },
            select: {
                id: true,
                email: true,
                name: true,
            }
        })

        const users: UserListItem[] = rawUsers.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
        }));
        return NextResponse.json(users);
    }

    const rawUsers = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
        }
    });

    const users: UserListItem[] = rawUsers.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
    }));

    return NextResponse.json(users);
}