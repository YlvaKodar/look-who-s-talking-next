"use client"

import LogInForm from "@/components/auth/LogInForm";
import { signIn } from "@/lib/auth-client";
import { SubmitEvent, useState } from "react";

export default function LogInPage() {
    const [serverError, setServerError] = useState<string | null>(null);
    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const result = await signIn.email({
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            callbackURL: "/dashboard"
        });

        if (result.error) {
            setServerError(result.error.message ?? "server result ej okej");
            return;
        }
    }

    return (
        <LogInForm onSubmit={handleSubmit} serverError={serverError}/>
    )
}