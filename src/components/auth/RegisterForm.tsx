import { InputField } from "@/components/ui/FormFields";

type RegisterFormProps = {
    onSubmit: (e:React.SubmitEvent<HTMLFormElement>) => void;
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        repeatPassword?: string[];
    };
    serverError?: string | null;
}

export default function RegisterForm({onSubmit, errors, serverError}: RegisterFormProps) {
    const emailLabel = "Email";
    const userNameLabel = "UserName if other than email";
    const passwordLabel = "Password";
    const repeatPasswordLabel = "Password again";
    const createAccountLabel = "Create account";

    return (
        <form onSubmit={onSubmit}>
            <InputField label={emailLabel} type="email" name="email" required />
            {errors?.email && <p>{errors.email[0]}</p>}
            <InputField label={userNameLabel} type="text" name="userName"/>
            <InputField label={passwordLabel} type="password" name="password" required/>
            {errors?.password && <p>{errors.password[0]}</p>}
            <InputField label={repeatPasswordLabel} type="password" name="repeatPassword" required/>
            {errors?.repeatPassword && <p>{errors.repeatPassword[0]}</p>}
            <button type="submit">{createAccountLabel}</button>
            {serverError && <p>{serverError}</p>}
        </form>
    )
}