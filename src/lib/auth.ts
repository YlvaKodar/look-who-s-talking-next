import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true
    },
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60
        }
    },
    advanced: {
        database: {
            generateId: () => crypto.randomUUID()
        },
    },
    user: {
        additionalFields:{
            role: {
                type: ["USER", "ADMIN"],
                input: false,
            }
        }
    },

});