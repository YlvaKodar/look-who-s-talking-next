"use client"
import { InputField } from "@/components/ui/FormFields";
import { MeetingSetupForm } from "@/constants/constants";
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

export default function SetupMeetingForm (){
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
            <div>
                <H2>{MeetingSetupForm.about}</H2>
                <InputField type="text" label={MeetingSetupForm.meetingTitleLabel} name="title" required/>
                {errors?.title && <p>{errors?.title[0]}</p>}
                <InputField type="number" label={MeetingSetupForm.womenCountLabel} name="womenCount" min={0} defaultValue={0} required/>
                {errors?.womenCount && <p>{errors?.womenCount[0]}</p>}
                <InputField type="number" label={MeetingSetupForm.nonbinaryCountLabel} name="nonbinaryCount" min={0} defaultValue={0} required/>
                {errors?.nonbinaryCount && <p>{errors?.nonbinaryCount[0]}</p>}
                <InputField type="number" label={MeetingSetupForm.menCountLabel} name="menCount" min={0} defaultValue={0} required/>
                {errors?.menCount && <p>{errors?.menCount[0]}</p>}
                {errors?.totalCount && <p>{errors?.totalCount[0]}</p>}
            </div>
            <div>
                <button type="submit">{MeetingSetupForm.submitLabel}</button>
            </div>
        </form>
    )
}
