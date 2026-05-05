import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { auth } from "@/lib/auth";

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

    await prisma.meeting.deleteMany();
    await prisma.group.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    await auth.api.signUpEmail({
        body: { name: "Queen Bee", email: "queen@bee.hive", password: "password1" }
    });
    await auth.api.signUpEmail({
        body: { name: "Ada Lovelace", email: "ada@lovelace.cyberspace", password: "password2" }
    });
    await auth.api.signUpEmail({
        body: { name: "Hedy Lamarr", email: "hedy@lamarr.cyberspace", password: "password3" }
    });
    await auth.api.signUpEmail({
        body: { name: "Agatha Christie", email: "agatha@christie.crimesforsale", password: "password4" }
    });

    const bee = await prisma.user.update({
        where: { email: "queen@bee.hive" },
        data: {
            createdAt: daysAgo(5),
            role: "ADMIN",
            keeperInGroups: {
                create: [
                    {
                        name: "Beehive",
                    }
                ]
            }
        },
        include: {
            keeperInGroups: true
        }
    });

    const ada = await prisma.user.update({
        where: { email: "ada@lovelace.cyberspace" },
        data: {
            createdAt: daysAgo(5),
            meetings: {
                create: [
                    {
                        title: "Adas first meeting",
                        womenCount: 3,
                        nonbinaryCount: 3,
                        menCount: 3,
                        womenSpeakingTime: 1000,
                        nonbinarySpeakingTime: 1000,
                        menSpeakingTime: 1000,
                        womenStatementCount: 5,
                        nonbinaryStatementCount: 4,
                        menStatementCount: 3
                    }
                ]
            },
            keeperInGroups: {
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
            keeperInGroups: true
        }
    });

    const hedy = await prisma.user.update({
        where: { email: "hedy@lamarr.cyberspace" },
        data: {
            createdAt: daysAgo(5),
            meetings: {
                create: [
                    {
                        title: "Lamarr's llama limitations",
                        womenCount: 3,
                        nonbinaryCount: 4,
                        menCount: 3,
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
                        womenSpeakingTime: 2000,
                        nonbinarySpeakingTime: 1000,
                        womenStatementCount: 5,
                        nonbinaryStatementCount: 4,
                    }
                ]
            },
        },
    });

    const agatha = await prisma.user.update({
        where: { email: "agatha@christie.crimesforsale" },
        data: {
            createdAt: daysAgo(5),
            email: "agatha@christie.crimesforsale",
            name: "Agatha Christie",
        }
    });

    const bookclub = ada.keeperInGroups.find(g => g.name === "Ada's bookclub");
    const beehive = bee.keeperInGroups.find(g => g.name === "Beehive");

    if (bookclub && beehive) {
        await prisma.groupClocker.createMany({
            data: [
                { userId: ada.id, groupId: beehive.id },
                { userId: hedy.id, groupId: beehive.id },
                { userId: agatha.id, groupId: beehive.id },
                { userId: agatha.id, groupId: bookclub.id },
            ]
        });
    }

    await prisma.meeting.create({
        data: {
            keeperId: agatha.id,
            groupId: beehive!.id,
            title: "Nursery rimes and how to use them",
            womenCount: 3,
            nonbinaryCount: 3,
            menCount: 3,
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
            keeperId: agatha.id,
            groupId: bookclub!.id,
            title: "Archaeology for dummies",
            womenCount: 3,
            nonbinaryCount: 3,
            menCount: 3,
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