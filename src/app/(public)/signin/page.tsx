"use client"

import RegisterForm from "@/components/auth/RegisterForm";
import { signUp } from "@/lib/auth-client";

export default function SignInPage(){
    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
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
    }

    return (
        <RegisterForm onSubmit={handleSubmit}/>
    )
}