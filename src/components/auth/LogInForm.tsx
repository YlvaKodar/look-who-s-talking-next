import { InputField } from "@/components/ui/FormFields";
import { signIn } from "@/lib/auth-client";
import { SubmitEvent, useState } from "react";



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
     <form onSubmit={handleSubmit}>
         <InputField label={emailLabel} name="email" required />
         <InputField label={passwordLabel} name="password" required/>
         <button type="submit">{logInLabel}</button>
         {serverError && <p>{serverError}</p>}
     </form>
    )
};