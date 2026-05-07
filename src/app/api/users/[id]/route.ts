import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { Prisma  } from "@/generated/prisma/client";
import {UserUpdateInput} from "@/generated/prisma/models/User";

export async function GET(
    request: Request,
    { params }  : { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    if (session.user.role !== "ADMIN") return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });

    const { id } = await params;

    const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status : 404 });
    }

    return NextResponse.json(user);
}

export async function PUT(
    request: Request,
    { params }  : { params: Promise<{ id: string }> }
    ) {

    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return NextResponse.json({ error: "No such session" }, { status: 401 });

    if (session.user.role !== "ADMIN") return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });

    const { id } = await params;
    const { email, name, role } = await request.json();

    const data: UserUpdateInput = {};
    if (name) data.name = name;
    if (email) data.email = email;

    if (role) {
        if (role !== "ADMIN" && role !== "USER") return NextResponse.json({error: "Invalid role. Must be 'ADMIN' or 'USER'"}, { status: 400 });

        if (id === session.user.id && role === "USER") {
            const adminCount = await prisma.user.count({  where: { role: "ADMIN" }   });
            if (adminCount === 1) return NextResponse.json({error: "A new admin must be assigned before this user's role can be updated."}, { status: 409 });
        }
        data.role = role;
    }

    if (!(Object.keys(data).length)) return NextResponse.json({error: "No data provided"})

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
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
    { params }: { params: Promise<{ id: string }> }
) {

    const session = await auth.api.getSession({ headers: await headers() });
    if(!session) return NextResponse.json({error: "No such session"}, { status: 401 });
    if (session.user.role !== "ADMIN") return NextResponse.json({error: "THIS DECISION IS NOT UP TO YOU"}, { status: 403 });

    const { id } = await params;

    if (id === session.user.id){
            const adminCount = await prisma.user.count({    where: { role: "ADMIN" }    });
            if (adminCount === 1) return NextResponse.json({error: "A new admin must be assigned before this user is deleted."}, { status: 409 });
    }

    try {
        const deletedUser = await prisma.user.delete({
            where: { id }
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