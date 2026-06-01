import { InputField } from "@/components/ui/FormFields";
import { signIn } from "@/lib/auth-client";
import { SubmitEvent, useState } from "react";
import { CommonButton } from "@/ui/Buttons";
import { ButtonContainer } from "@/ui/Containers";
import { ValidationMessage } from "@/ui/Common";
import { Common } from "@/constants/constants";


export default function LogInForm() {
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
            <form noValidate className={"py-4"} onSubmit={handleSubmit}>
                <InputField label={`${Common.userEmail}:`} name="email" required />
                <InputField label={`${Common.password}:`} name="password" required/>
                <ButtonContainer>
                    <CommonButton type="submit">{Common.logIn}</CommonButton>
                </ButtonContainer>
                {serverError && <ValidationMessage>{serverError}</ValidationMessage>}
            </form>
        </div>
    )
};