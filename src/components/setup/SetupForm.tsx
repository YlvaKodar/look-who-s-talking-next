"use client"
import { authClient } from "@/lib/auth-client";
import { InputField, SelectField } from "@/components/ui/FormFields";
import {CommonButton, ListButton} from "@/ui/Buttons";
import { SchemePicker } from "@/components/setup/SchemePicker";
import { SetupText } from "@/constants/constants";
import { ButtonContainer } from "@/ui/Containers";
import { H2} from "@/components/ui/Headings";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { useRouter } from "next/navigation";
import { createCurrentMeeting } from "@/utils/meetingUtil";
import { SyntheticEvent, useEffect, useState } from "react";
import { SetupMeetingFormSchema } from "@/lib/definitions";
import { z } from "zod";
import { GroupListItem } from "@/types/group";
import { LoadingIndicator, ValidationMessage } from "@/ui/Common";

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


function GroupSelector () {
    const [options, setOptions] = useState<{value: string, label: string}[]>([]);
    const [selected, setSelected] = useState<{value: string, label: string} | null>(null);
    const { data: session } = authClient.useSession();

    let placeholder = "Meeting group?";

    useEffect(() => {

        async function fetchGroups() {
            if (!session) return;
            try {
                const result = await fetch(`/api/groups?status=myGroups`);
                if (!result.ok) {
                    const error = await result.json();
                    console.error(error.code, error.error);
                    return;
                }
                const groups: GroupListItem[] = await result.json();
                if (!groups.length) placeholder = "You have no groups loser";
                setOptions(groups.map((g) => ({ value: g.id, label: g.name })));
                groups.map((g) => (console.log(g.name)));

            } catch (error) {
                console.error(error);
            }
        }
        fetchGroups()
    }, [session]);

    return (
        <>
            <SelectField
                label="Grupp"
                name="groupId"
                options={options}
                placeholder="Meeting group?"
                defaultValue={""}
                onChange={(e) => {
                    const opt = options.find(o => o.value === e.target.value) ?? null;
                    setSelected(opt);
                }}
            />
            {selected && (
                <input type="hidden" name="groupName" value={selected.label} />
            )}
        </>
    );
}