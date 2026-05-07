import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Prisma  } from "@/generated/prisma/client";
import {UserUpdateInput} from "@/generated/prisma/models/User";

export async function GET(
    request: Request,
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
        }
    });

    return NextResponse.json(user);
}

export async function PUT(
    request: Request,
    ){

    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    const { email, name } = await request.json();

    const data: UserUpdateInput = {};
    if (name) data.name = name;
    if (email) data.email = email;

    if (!(Object.keys(data).length)) return NextResponse.json({error: "No data provided"})

    try {
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data
        })
        return NextResponse.json(updatedUser, {status: 200})

    } catch (error){
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "User not found" }, { status : 404 });
            if (error.code === "P2002") return NextResponse.json({ error: "The name or email might not be available." }, { status : 409 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
) {

    const session = await auth.api.getSession({
        headers: await headers()
    });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });

    if (session.user.role === "ADMIN"){
        const adminCount = await prisma.user.count({
            where: { role: "ADMIN" }
        });

        if (adminCount === 1) return NextResponse.json({error: "A new admin must be assigned before this user is deleted."}, { status: 409 });
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { id: session.user.id }
        })

        return NextResponse.json(deletedUser, { status: 200});

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") return NextResponse.json({ error: "User not found" }, { status : 404 });
            if (error.code === "P2003") return NextResponse.json({ error: "Account cannot be deleted unless all connected meetings and groups are deleted or assigned new keepers." }, { status : 409 });
        }
        return NextResponse.json({ error: "Ok, so this didn't go as planned ..." }, { status: 500 })
    }
}