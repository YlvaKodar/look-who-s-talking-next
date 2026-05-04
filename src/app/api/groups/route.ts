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

    if (status && status === "creator") {
        const groups = await prisma.group.findMany({
            where: {creatorId: session.user.id}
        });

        return NextResponse.json(groups);
    }

    if (status && status === "klocker") {
        const groups = await prisma.group.findMany({
            where: {
                klockers: {
                    some: {
                        id: session.user.id}}
            }
        });

        return NextResponse.json(groups);
    }

    const groups = await prisma.group.findMany();

    return NextResponse.json(groups);
}


