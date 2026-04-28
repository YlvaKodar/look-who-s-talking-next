"use client"

import LogInForm from "@/components/auth/LogInForm";
import { signIn } from "@/lib/auth-client";
import { SubmitEvent } from "react";

export default function LogInPage() {
    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            callbackURL: "/dashboard"
        });

        console.log(result);
    }

    return (
        <LogInForm onSubmit={handleSubmit}/>
    )
}