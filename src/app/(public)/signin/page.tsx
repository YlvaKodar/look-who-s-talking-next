"use client"

import RegisterForm from "@/components/auth/RegisterForm";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SubmitEvent } from "react";

export default function SignInPage(){
    const router = useRouter();
    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const password = formData.get("password") as string;
        const repeatPassword = formData.get("repeatPassword") as string;
        if (password !== repeatPassword) {
            console.error("no match");
            return;
        }

        const result = await signUp.email({
            email: formData.get("email") as string,
            name: (formData.get("userName") as string) || (formData.get("email") as string),
            password: formData.get("password") as string,
            callbackURL: "/dashboard"
        });

        if (result.error) {
            console.error(result.error);
            return;
        }
        router.push("/dashboard");
    }

    return (
        <RegisterForm onSubmit={handleSubmit}/>
    )
}