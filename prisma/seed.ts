import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({connectionString: process.env["DATABASE_URL"]});

const prisma = new PrismaClient({
    adapter
});

const userData: Prisma.UserCreateInput[] = [
    {
        email: "ada@lovelace.cyberspace",
        name: "Ada Lovelace",
    },
    {
        email: "hedy@lamarr.cyberspace",
        name: "Hedy Lamarr"
    }
];

export async function main(){
    for (const u of userData){
        await prisma.user.create({data:u});
    }
}

main();