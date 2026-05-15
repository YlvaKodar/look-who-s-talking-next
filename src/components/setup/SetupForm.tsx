"use client"
import { InputField } from "@/components/ui/FormFields";
import { CommonButton } from "@/ui/Buttons";
import { ThemePicker } from "@/components/setup/ThemePicker";
import { SetupText } from "@/constants/constants";
import { ButtonContainer } from "@/ui/Containers";
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { useRouter } from "next/navigation";
import { createActiveMeeting } from "@/util/meetingUtil";
import {SyntheticEvent, useState} from "react";
import { SetupMeetingFormSchema } from "@/lib/definitions";
import { z } from "zod";

type FormErrors = {
    title?: string[];
    womenCount?: string[];
    nonbinaryCount?: string[];
    menCount?: string[];
    totalCount?: string[];
}

export default function SetupForm (){
    const [errors, setErrors] = useState<FormErrors>({});
    const { setup } = useMeetingStorage();
    const router = useRouter();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);

        const title = data.get("title") as string;
        const startedAt = new Date();
        const womenCount = Number(data.get("womenCount")) || 0;
        const nonbinaryCount = Number(data.get("nonbinaryCount")) || 0;
        const menCount = Number(data.get("menCount")) || 0;
        const totalCount = womenCount + nonbinaryCount + menCount || 0;

        const result = SetupMeetingFormSchema.safeParse({
            title,
            womenCount,
            nonbinaryCount,
            menCount,
            totalCount,
        })

        if (!result.success) {
            const tree = z.treeifyError(result.error);
            setErrors({
                title: tree.properties?.title?.errors,
                womenCount: tree.properties?.womenCount?.errors,
                nonbinaryCount: tree.properties?.nonbinaryCount?.errors,
                menCount: tree.properties?.menCount?.errors,
                totalCount: tree.properties?.totalCount?.errors,
            })
            return
        }

        setErrors({});

        const activeMeeting = createActiveMeeting(
            title,
            startedAt,
            womenCount,
            nonbinaryCount,
            menCount,
        );

        setup.save(activeMeeting)
        router.push('/meeting')
    };


    return (
        <form onSubmit={handleSubmit}>

                <H2>{SetupText.about}</H2>
                <InputField type="text" label={SetupText.meetingTitleLabel} name="title" required/>
                {errors?.title && <p>{errors?.title[0]}</p>}
                <InputField type="number" label={SetupText.womenCountLabel} name="womenCount" min={0} defaultValue={0} required/>
                {errors?.womenCount && <p>{errors?.womenCount[0]}</p>}
                <InputField type="number" label={SetupText.nonbinaryCountLabel} name="nonbinaryCount" min={0} defaultValue={0} required/>
                {errors?.nonbinaryCount && <p>{errors?.nonbinaryCount[0]}</p>}
                <InputField type="number" label={SetupText.menCountLabel} name="menCount" min={0} defaultValue={0} required/>
                {errors?.menCount && <p>{errors?.menCount[0]}</p>}
                {errors?.totalCount && <p>{errors?.totalCount[0]}</p>}

            <ThemePicker/>

            <ButtonContainer>
                <CommonButton type="submit">{SetupText.submitLabel}</CommonButton>
            </ButtonContainer>
        </form>
    )
}
