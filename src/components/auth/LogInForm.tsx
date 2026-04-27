import { InputField } from "@/components/ui/FormFields";

type LogInFormProps = {
    onSubmit: (e:React.SubmitEvent<HTMLFormElement>) => void;
}

export default function LogInForm({ onSubmit }: LogInFormProps) {
    const emailLabel = "Email";
    const passwordLabel = "Password";
    const logInLabel = "Sign in";

    return (
     <form onSubmit={onSubmit}>
         <InputField label={emailLabel} name="email" required />
         <InputField label={passwordLabel} name="password" required/>
         <button type="submit">{logInLabel}</button>
     </form>
    )
};