import { PrismaClient, Prisma } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({connectionString: process.env["DATABASE_URL"]});

const prisma = new PrismaClient({
    adapter
});

function daysAgo(days: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
}

async function main(){
    const bee = await prisma.user.upsert({
        where: { email: "queen@bee.hive" },
        update: {},
        create: {
            createdAt: daysAgo(5),
            email: "queen@bee.hive",
            userName: "Queen Bee",
            createdGroups: {
                create: [
                    {
                        name: "Beehive",
                    }
                ]
            }
        },
        include: {
            createdGroups: true
        }
    });

    const ada = await prisma.user.upsert({
        where: { email: "ada@lovelace.cyberspace" },
        update: {},
        create: {
            createdAt: daysAgo(5),
            email: "ada@lovelace.cyberspace",
            userName: "Ada Lovelace",
            meetings: {
                create: [
                    {
                        title: "Adas first meeting",
                        womenCount: 3,
                        nonbinaryCount: 3,
                        menCount: 3,
                        totalSpeakingTime: 3000,
                        womenSpeakingTime: 1000,
                        nonbinarySpeakingTime: 1000,
                        menSpeakingTime: 1000,
                        womenStatementCount: 5,
                        nonbinaryStatementCount: 4,
                        menStatementCount: 3
                    }
                ]
            },
            createdGroups: {
                create: [
                    {
                        name: "Ada's fanclub",
                        description: "Discussion forum",
                    },
                    {
                        name: "Ada's bookclub",
                    }
                ]
            }
        },
        include: {
            createdGroups: true
        }
    });

    const hedy = await prisma.user.upsert({
        where: { email: "hedy@lamarr.cyberspace" },
        update: {},
        create: {
            createdAt: daysAgo(5),
            email: "hedy@lamarr.cyberspace",
            userName: "Hedy Lamarr",
            meetings: {
                create: [
                    {
                        title: "Lamarr's llama limitations",
                        womenCount: 3,
                        nonbinaryCount: 4,
                        menCount: 3,
                        totalSpeakingTime: 3000,
                        womenSpeakingTime: 1000,
                        nonbinarySpeakingTime: 1000,
                        menSpeakingTime: 1000,
                        womenStatementCount: 5,
                        nonbinaryStatementCount: 4,
                        menStatementCount: 3
                    },
                    {
                        title: "Important bizznizz",
                        startedAt: daysAgo(1),
                        womenCount: 3,
                        nonbinaryCount: 3,
                        totalSpeakingTime: 3000,
                        womenSpeakingTime: 2000,
                        nonbinarySpeakingTime: 1000,
                        womenStatementCount: 5,
                        nonbinaryStatementCount: 4,
                    }
                ]
            },
        },
    });

    const agatha = await prisma.user.upsert({
        where: { email: "agatha@christie.crimesforsale" },
        update: {},
        create: {
            createdAt: daysAgo(5),
            email: "agatha@christie.crimesforsale",
            userName: "Agatha Christie",
        }
    });

    const bookclub = ada.createdGroups.find(g => g.name === "Ada's bookclub");
    const beehive = bee.createdGroups.find(g => g.name === "Beehive");

    await prisma.group.update({
        where: {
            creatorId_name: {
                creatorId: bee.id,
                name: "Beehive"
            }
        },
        data: {
            klockers: {
                connect: [
                    { id: ada.id },
                    { id: hedy.id },
                    { id: agatha.id },
                ]
            }
        }
    });

    await prisma.group.update({
        where: {
            creatorId_name: {
                creatorId: ada.id,
                name: "Ada's bookclub"
            }
        },
        data: {
            klockers: {
                connect: [
                    { id: agatha.id },
                ]
            }
        }
    });

    await prisma.meeting.create({
        data: {
            creatorId: agatha.id,
            groupId: beehive!.id,
            title: "Nursery rimes and how to use them",
            womenCount: 3,
            nonbinaryCount: 3,
            menCount: 3,
            totalSpeakingTime: 3000,
            womenSpeakingTime: 1000,
            nonbinarySpeakingTime: 1000,
            menSpeakingTime: 1000,
            womenStatementCount: 5,
            nonbinaryStatementCount: 4,
            menStatementCount: 3
        }
    })
    await prisma.meeting.create({
        data: {
            createdAt: daysAgo(3),
            startedAt: daysAgo(3),
            creatorId: agatha.id,
            groupId: bookclub!.id,
            title: "Archaeology for dummies",
            womenCount: 3,
            nonbinaryCount: 3,
            menCount: 3,
            totalSpeakingTime: 3000,
            womenSpeakingTime: 1000,
            nonbinarySpeakingTime: 1000,
            menSpeakingTime: 1000,
            womenStatementCount: 5,
            nonbinaryStatementCount: 4,
            menStatementCount: 3
        }
    })
}

main()
    .then(async ()=> {
        await prisma.$disconnect();
    })
    .catch(async (e)=> {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })