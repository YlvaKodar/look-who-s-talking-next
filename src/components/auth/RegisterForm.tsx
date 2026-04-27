import { InputField } from "@/components/ui/FormFields";

type RegisterFormProps = {
    onSubmit: (e:React.SubmitEvent<HTMLFormElement>) => void;
}

export default function RegisterForm({onSubmit}: RegisterFormProps) {
    const emailLabel = "Email";
    const userNameLabel = "UserName if other than email";
    const passwordLabel = "Password";
    const repeatPasswordLabel = "Password";
    const createAccountLabel = "Create account";

    return (
        <form onSubmit={onSubmit}>
            <InputField label={emailLabel} type="email" name="email" required />
            <InputField label={userNameLabel} type="text" name="userName"/>
            <InputField label={passwordLabel} type="password" name="password" required/>
            <InputField label={repeatPasswordLabel} type="password" name="repeatPassword" required/>
            <button type="submit">{createAccountLabel}</button>
        </form>
    )
}