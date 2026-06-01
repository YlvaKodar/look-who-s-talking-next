import { CommonButton } from "@/ui/Buttons";
import { InputField } from "@/components/ui/FormFields";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { RegisterFormSchema } from "@/lib/definitions";
import { z } from "zod";
import { ButtonContainer } from "@/ui/Containers";
import { ValidationMessage } from "@/ui/Common";
import { Common } from "@/constants/constants";

type FormErrors = {
    name?: string[];
    email?: string[];
    password?: string[];
    repeatPassword?: string[];
}

export default function RegisterForm() {
    const createAccountLabel = "Create account";

    const [errors, setErrors] = useState<FormErrors>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const router = useRouter();

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setServerError(null);

        const formData = new FormData(e.currentTarget);

        const result = RegisterFormSchema.safeParse({
            email: formData.get("email"),
            password: formData.get("password"),
            repeatPassword: formData.get("repeatPassword"),
        });

        if (!result.success) {
            const tree = z.treeifyError(result.error);
            setErrors({
                email: tree.properties?.email?.errors,
                password: tree.properties?.password?.errors,
                repeatPassword: tree.properties?.repeatPassword?.errors,
            });
            return;
        }

        setErrors({});

        const serverResult = await signUp.email({
            email: result.data.email,
            name: (formData.get("userName") as string) || result.data.email,
            password: result.data.password,
            callbackURL: "/dashboard"
        });

        if (serverResult.error) {
            setServerError(serverResult.error.message ?? "server result ej okej");
            return;
        } else {
            router.push("/dashboard");
        }
    }

    return (
        <div className="w-full mx-auto max-w-sm flex flex-col">
            <form noValidate className="w-full flex flex-col" onSubmit={handleSubmit}>
                <InputField label={`${Common.userEmail}:`} type="email" name="email" required />
                {errors?.email && <ValidationMessage>{errors.email[0]}</ValidationMessage>}
                <InputField label={`${Common.userNameOther}:`} type="text" name="userName"/>
                <InputField label={`${Common.password}:`} type="password" name="password" required/>
                {errors?.password && <ValidationMessage>{errors.password[0]}</ValidationMessage>}
                <InputField label={`${Common.repeatPassword}:`} type="password" name="repeatPassword" required/>
                {errors?.repeatPassword && <ValidationMessage>{errors.repeatPassword[0]}</ValidationMessage>}
                <ButtonContainer>
                    <CommonButton type="submit">{Common.signUp}</CommonButton>
                </ButtonContainer>
                {serverError && <ValidationMessage>{serverError}</ValidationMessage>}
            </form>
        </div>
    )
}