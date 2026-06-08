"use client"
import {useSession} from "@/lib/auth-client";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {MeetingStats, Gender, Stats} from "@/types/meeting";
import {H1, H3, H4} from "@/ui/Headings";
import {StatsPresentation} from "@/components/stats/StatsPresentation";
import {LoadingIndicator, ValidationMessage} from "@/ui/Common";
import {ButtonContainer, DangerContainer, SimpleContainer} from "@/ui/Containers";
import {Common, MeetingText} from "@/constants/constants";
import {CommonButton} from "@/ui/Buttons";
import {CheckboxField} from "@/ui/FormFields";
import {GroupSelector} from "@/components/setup/GroupSelector";

export function MeetingView() {
    const {data: session, isPending} = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login");
        }
    }, [isPending, session, router]);

    if (isPending) {
        return (
            <LoadingIndicator/>
        )
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <MeetingDetails sessionId={session.user.id} sessionRole={session.user.role} />
        </>
    )
}

function MeetingDetails({sessionId, sessionRole}: {sessionId : string, sessionRole: string }) {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [meeting, setMeeting] = useState<MeetingStats | null>(null);
    const { id } = useParams();

    useEffect(() => {
        async function fetchMeeting(){
            try {
                const result = await fetch(`/api/meetings/${id}`);
                if (!result.ok) {
                    const error = await result.json();
                    setError(error.error);
                    console.error(error.code, error.error);
                    return;
                }
                const meeting: MeetingStats = await result.json();
                setMeeting(meeting);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchMeeting();
    }, [id]);

    if (loading) {
        return (
            <LoadingIndicator/>
        )
    }

    if (!meeting) {
        return (
            <SimpleContainer>
                <div onClick={() => setError(null)}>
                    <ValidationMessage>{error}</ValidationMessage>
                </div>
            </SimpleContainer>
        )
    }

    const presentGenders = (Object.entries(meeting?.genderStats) as [Gender, Stats][])
        .filter(([_, stats]) => stats.participating > 0)
        .map(([gender]) => gender);

    return (
        <>
            <H1>{meeting.title}</H1>
            <H3>{meeting?.groupName} {meeting.startedAt}</H3>
            <StatsPresentation meetingStats={meeting} presentGenders={presentGenders} />
            { (sessionRole === "ADMIN" || sessionId === meeting.keeperId) && (
                <div className={`w-full flex flex-col gap-2 py-2 `}>
                    <div className={`w-full flex flex-col gap-2 rounded-md border border-foreground-dark bg-bglight p-4`}>
                        <AddMeetingGroup meeting={meeting} sessionId={sessionId} admin={sessionRole === "ADMIN"} />
                    </div>
                </div>
            )}
        </>
    )
}

function AddMeetingGroup( {meeting, sessionId, admin}: {meeting: MeetingStats, sessionId: string, admin: boolean}) {
    const [error, setError] = useState<string | null>(null);
    const [ok, setOk] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [keeperCheckBox, setKeeperCheckBox] = useState<boolean>(false);
    const router = useRouter();

    async function handleAddGroup(){
        if (!selectedGroupId) {
            setError("Please select a group first.");
            return;
        }
        setError(null);
        setLoading(true);

        try {
            const result = await fetch(`/api/meetings/${meeting.id}/group`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ groupId: selectedGroupId }),
            });
            const res = await result.json();
            if (!result.ok) {
                console.error(res.code, res.error);
                setError(res.error);
                return;
            }
            setOk(res.message);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    async function handleChangeKeeper(){
        if (!keeperCheckBox) {
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const result = await fetch(`/api/meetings/${meeting.id}/transfer-keeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const res = await result.json();
            if (!result.ok) {
                console.error(res.code, res.error);
                setError(res.error);
                return;
            }
            setOk(res.message);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {error && (
                <SimpleContainer>
                    <div onClick={() => setError(null)}>
                        <ValidationMessage>{error}</ValidationMessage>
                    </div>
                </SimpleContainer>
            )}
            {ok && (
                <SimpleContainer>
                    <div onClick={() => setOk(null)}>
                        <ValidationMessage messageType={"success"}>{ok}</ValidationMessage>
                    </div>
                </SimpleContainer>
            )}
            { (admin || !meeting.groupName) && (
                <>
                    <H4>{MeetingText.addGroupLabel}</H4>
                    <SimpleContainer>
                        <p>{MeetingText.addGroupInfo}</p>
                    </SimpleContainer>
                    <GroupSelector onSelect={(group) => setSelectedGroupId(group?.id ?? null)} />
                    <ButtonContainer>
                        <CommonButton
                            onClick={handleAddGroup}
                            disabled={!selectedGroupId || loading}
                        >
                            {MeetingText.addGroupButton}
                        </CommonButton>
                    </ButtonContainer>
                </>
            )}
            { meeting.groupName && (
                <SwitchKeeper meeting={meeting}/>
            )}
            { (meeting.id && (admin || meeting.keeperId === sessionId)) && (
                <DeleteMeeting id={meeting.id}/>
            )}
        </>
    )
}

function SwitchKeeper ( {meeting}: {meeting: MeetingStats}) {
    const [error, setError] = useState<string | null>(null);
    const [ok, setOk] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [keeperCheckBox, setKeeperCheckBox] = useState<boolean>(false);
    const router = useRouter();

    async function handleChangeKeeper(){
        if (!keeperCheckBox) {
            return;
        }
        setError(null);
        setLoading(true);
        try {
            const result = await fetch(`/api/meetings/${meeting.id}/transfer-keeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            const res = await result.json();
            if (!result.ok) {
                console.error(res.code, res.error);
                setError(res.error);
                return;
            }
            setOk(res.message);
            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {error && (
                <SimpleContainer>
                    <div onClick={() => setError(null)}>
                        <ValidationMessage>{error}</ValidationMessage>
                    </div>
                </SimpleContainer>
            )}
            {ok && (
                <SimpleContainer>
                    <div onClick={() => setOk(null)}>
                        <ValidationMessage messageType={"success"}>{ok}</ValidationMessage>
                    </div>
                </SimpleContainer>
            )}
            { meeting.groupName && (
                <>
                    <H4>{`${Common.groupLabel}: ${meeting.groupName}`}</H4>
                    <SimpleContainer>
                        <p>{MeetingText.changeKeeperInfo}</p>
                        <CheckboxField label={MeetingText.changeKeeperCheckbox} name={"keeper"} checked={keeperCheckBox} onChange={setKeeperCheckBox} />
                        <ButtonContainer>
                            <CommonButton
                                onClick={handleChangeKeeper}
                                disabled={!keeperCheckBox}
                            >
                                {MeetingText.changeKeeperButton}
                            </CommonButton>
                        </ButtonContainer>
                    </SimpleContainer>
                </>
            )}
        </>
    )
}

function DeleteMeeting({id}: {id: string}) {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        setError(null)
        try{
            const result = await fetch(`/api/meetings/${id}`, {
                method: "DELETE",
            });

            const res = await result.json();

            if (!result.ok) {
                setError(res.error);
                setShowConfirm(false);
                return;
            }

            router.push("/dashboard");

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {error && (
                <SimpleContainer>
                    <div onClick={() => setError(null)}>
                        <ValidationMessage>{error}</ValidationMessage>
                    </div>
                </SimpleContainer>
            )}
            <>
                <ButtonContainer>
                    <CommonButton type={"button"} disabled={showConfirm} variant={"danger"} onClick={() => setShowConfirm(true)}>{Common.deleteAccount}</CommonButton>
                </ButtonContainer>
            </>

            {showConfirm && (
                <DangerContainer>
                    <H4>{Common.areYouSure}</H4>
                    <ButtonContainer>
                        <CommonButton variant={"secondary"} onClick={() => setShowConfirm(false)}>{Common.no}</CommonButton>
                        <CommonButton variant={"danger"} onClick={handleDelete}>{Common.yes}</CommonButton>
                    </ButtonContainer>
                </DangerContainer>
            )}

            {loading && (
                <LoadingIndicator/>
            )}
        </>
    )
}

