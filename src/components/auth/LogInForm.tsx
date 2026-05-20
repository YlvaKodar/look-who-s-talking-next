import { InputField } from "@/components/ui/FormFields";
import { signIn } from "@/lib/auth-client";
import { SubmitEvent, useState } from "react";
import {CommonButton} from "@/ui/Buttons";
import {ButtonContainer} from "@/ui/Containers";



export default function LogInForm() {
    const emailLabel = "Email";
    const passwordLabel = "Password";
    const logInLabel = "Sign in";

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
        <div className="w-full mx-auto max-w-sm flex flex-col">
            <form className={"py-4"} onSubmit={handleSubmit}>
                <InputField label={emailLabel} name="email" required />
                <InputField label={passwordLabel} name="password" required/>
                <ButtonContainer>
                    <CommonButton type="submit">{logInLabel}</CommonButton>
                </ButtonContainer>
                {serverError && <p>{serverError}</p>}
            </form>
        </div>
    )
};