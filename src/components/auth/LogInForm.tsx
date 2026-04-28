import { InputField } from "@/components/ui/FormFields";

type LogInFormProps = {
    onSubmit: (e:React.SubmitEvent<HTMLFormElement>) => void;
    serverError?: string | null;
}

export default function LogInForm({ onSubmit, serverError }: LogInFormProps) {
    const emailLabel = "Email";
    const passwordLabel = "Password";
    const logInLabel = "Sign in";

    return (
     <form onSubmit={onSubmit}>
         <InputField label={emailLabel} name="email" required />
         <InputField label={passwordLabel} name="password" required/>
         <button type="submit">{logInLabel}</button>
         {serverError && <p>{serverError}</p>}
     </form>
    )
};