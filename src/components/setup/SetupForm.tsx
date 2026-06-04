"use client"
import {authClient} from "@/lib/auth-client";
import {InputField} from "@/components/ui/FormFields";
import {CommonButton, ListButton} from "@/ui/Buttons";
import {SchemePicker} from "@/components/setup/SchemePicker";
import {SetupText} from "@/constants/constants";
import {ButtonContainer} from "@/ui/Containers";
import {H2} from "@/components/ui/Headings";
import {useMeetingStorage} from "@/hooks/useMeetingStorage";
import {useRouter} from "next/navigation";
import {createCurrentMeeting} from "@/utils/meetingUtil";
import {SyntheticEvent, useState} from "react";
import {SetupMeetingFormSchema} from "@/lib/definitions";
import {z} from "zod";
import {LoadingIndicator, ValidationMessage} from "@/ui/Common";
import {GroupSelector} from "@/components/setup/GroupSelector";

type SetupFormProps = {
    groupId?: string;
    groupName?: string;
}

type FormErrors = {
    title?: string[];
    womenCount?: string[];
    nonbinaryCount?: string[];
    menCount?: string[];
    totalCount?: string[];
}

export default function SetupForm ({groupId, groupName}: SetupFormProps) {
    const [errors, setErrors] = useState<FormErrors>({});
    const [showSelectGroups, setShowSelectGroups] = useState<boolean>(groupId === undefined);
    const { setup } = useMeetingStorage();
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    if (isPending) {
        return (
            <LoadingIndicator/>
        )
    }

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const title = data.get("title") as string;
        const groupId = data.get("groupId") as string;
        const groupName = data.get("groupName") as string;
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

        const activeMeeting = createCurrentMeeting(
            title,
            startedAt,
            groupId,
            groupName,
            womenCount,
            nonbinaryCount,
            menCount,
        );

        setup.save(activeMeeting)
        router.push('/timer')
    };


    return (
        <form noValidate className="w-full flex flex-col" onSubmit={handleSubmit}>
            <H2>{SetupText.about}</H2>
            { session &&  !showSelectGroups  && (
                <div className="w-full mx-auto flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-foreground">{SetupText.groupTitleLabel}</label>
                    <div className={`w-full flex flex-row rounded-md border border-foreground bg-bglight px-3 py-2
                             text-foreground placeholder:text-foreground/40 justify-between`}>
                        <span className="text-foreground">{groupName}</span>
                        <ListButton variant={"primary"}
                            onClick={() => setShowSelectGroups(!showSelectGroups)}
                        >{SetupText.changeGroup}</ListButton>
                    </div>
                </div>

            )}

            { session && showSelectGroups && (
                <GroupSelector />
            )}

            { !showSelectGroups && (
                <>
                    <input type="hidden" name="groupId" value={groupId} />
                    <input type="hidden" name="groupName" value={groupName} />
                </>
            )}

            <InputField type="text" label={SetupText.meetingTitleLabel} name="title" required/>
            {errors?.title && <ValidationMessage>{errors?.title[0]}</ValidationMessage>}
            <InputField type="number" label={SetupText.womenCountLabel} name="womenCount" min={0} defaultValue={0} required/>
            {errors?.womenCount &&  <ValidationMessage>{errors?.womenCount[0]}</ValidationMessage>}
            <InputField type="number" label={SetupText.nonbinaryCountLabel} name="nonbinaryCount" min={0} defaultValue={0} required/>
            {errors?.nonbinaryCount &&  <ValidationMessage>{errors?.nonbinaryCount[0]}</ValidationMessage>}
            <InputField type="number" label={SetupText.menCountLabel} name="menCount" min={0} defaultValue={0} required/>
            {errors?.menCount &&  <ValidationMessage>{errors?.menCount[0]}</ValidationMessage>}
            {errors?.totalCount &&  <ValidationMessage>{errors?.totalCount[0]}</ValidationMessage>}

            <SchemePicker/>

            <ButtonContainer>
                <CommonButton type="submit">{SetupText.submitLabel}</CommonButton>
            </ButtonContainer>
        </form>
    )
}


