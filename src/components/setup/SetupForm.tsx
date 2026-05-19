"use client"
import { authClient } from "@/lib/auth-client";
import { InputField, SelectField } from "@/components/ui/FormFields";
import { CommonButton } from "@/ui/Buttons";
import { SchemePicker } from "@/components/setup/SchemePicker";
import { SetupText } from "@/constants/constants";
import { ButtonContainer } from "@/ui/Containers";
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { useRouter } from "next/navigation";
import { createCurrentMeeting } from "@/utils/meetingUtil";
import { SyntheticEvent, useEffect, useState } from "react";
import { SetupMeetingFormSchema } from "@/lib/definitions";
import { z } from "zod";
import { GroupListItem } from "@/types/group";

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
    const { data: session } = authClient.useSession();
    const router = useRouter();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.target as HTMLFormElement);
        const title = data.get("title") as string;
        const groupId = data.get("groupId") as string;
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
            { session &&  !showSelectGroups  && (
                <div className="flex flex-col gap-1.5 w-full md:max-w-sm">
                    <label className="text-sm font-medium text-foreground">Grupp</label>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-foreground">{groupName}</span>
                        <CommonButton
                            onClick={() => setShowSelectGroups(!showSelectGroups)}
                        >Byt</CommonButton>
                    </div>
                </div>
            )}

            { session && showSelectGroups && (
                <GroupSelector />
            )}

            { !showSelectGroups && (
                <input type="hidden" name="groupId" value={groupId} />
            )}

            <InputField type="text" label={SetupText.meetingTitleLabel} name="title" required/>
            {errors?.title && <p>{errors?.title[0]}</p>}
            <InputField type="number" label={SetupText.womenCountLabel} name="womenCount" min={0} defaultValue={0} required/>
            {errors?.womenCount && <p>{errors?.womenCount[0]}</p>}
            <InputField type="number" label={SetupText.nonbinaryCountLabel} name="nonbinaryCount" min={0} defaultValue={0} required/>
            {errors?.nonbinaryCount && <p>{errors?.nonbinaryCount[0]}</p>}
            <InputField type="number" label={SetupText.menCountLabel} name="menCount" min={0} defaultValue={0} required/>
            {errors?.menCount && <p>{errors?.menCount[0]}</p>}
            {errors?.totalCount && <p>{errors?.totalCount[0]}</p>}

            <SchemePicker/>

            <ButtonContainer>
                <CommonButton type="submit">{SetupText.submitLabel}</CommonButton>
            </ButtonContainer>
        </form>
    )
}


function GroupSelector () {
    const [options, setOptions] = useState<{value: string, label: string}[]>([]);
    let placeholder = "Meeting group?";

    useEffect(() => {
        async function fetchGroups() {
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
    }, []);

    return (
        <>
            <SelectField
                label="Grupp"
                name="groupId"
                options={options}
                placeholder={placeholder}
                defaultValue={""}
            />
        </>
    )
}
