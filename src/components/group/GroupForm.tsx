"use client"
import { InputField } from "@/components/ui/FormFields";
import { CommonButton } from "@/ui/Buttons";
import { GroupText } from "@/constants/constants";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState} from "react";
import { GroupFormSchema } from "@/lib/definitions";
import { z } from "zod";
import {ButtonContainer} from "@/ui/Containers";
import {H3} from "@/ui/Headings";

type FormErrors = {
    name?: string[];
    description?: string[];
}

export default function GroupForm() {
    const [errors, setErrors] = useState<FormErrors>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit (e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        setApiError(null);
        setErrors({});
        const data = new FormData(e.target as HTMLFormElement);
        const name = data.get("name") as string;
        const description = data.get("description") as string;

        const result = GroupFormSchema.safeParse({
            name,
            description,
        })

        if (!result.success) {
            const tree = z.treeifyError(result.error);
            setErrors({
                name: tree.properties?.name?.errors,
                description: tree.properties?.description?.errors,
            })
            return
        }

        try {
            const res = await fetch("/api/groups", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(result.data),
            })

            if (!res.ok) {
                const error = await res.json();
                console.error(error.code, error.error );
                setApiError(error.error ?? "Error! Alert! DANGER!");
            }

            const group = await res.json();
            router.push(`/group/${group.id}`);
            router.refresh();

        } catch (error) {
            setApiError("Fnurr på tråden!");
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <H3>{GroupText.formHeading}</H3>
            {apiError && <p role="alert">{apiError}</p>}
            <InputField type="text" label={GroupText.nameLabel} name="name" required/>
            {errors?.name && <p>{errors?.name[0]}</p>}
            <InputField type="text" label={GroupText.descriptionLabel} name="description"/>
            {errors?.description && <p>{errors?.description[0]}</p>}
            <ButtonContainer>
                <CommonButton type="submit" >{GroupText.submitLabel}</CommonButton>
            </ButtonContainer>
        </form>
    )
}