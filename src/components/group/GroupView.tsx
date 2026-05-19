"use client"
import { useSession } from "@/lib/auth-client";
import { H1, H3 } from "@/ui/Headings"
import {CommonButton, ListButton} from "@/ui/Buttons";
import { GroupText } from "@/constants/constants";
import { useState, useEffect } from "react";
import { List } from "@/ui/Lists";
import { MeetingListItem } from "@/types/meeting"
import { UserListItem } from "@/types/user";
import {ChevronIcon, Tooltip} from "@/ui/Common";
import { useParams, useRouter} from 'next/navigation';
import { GroupPageItem } from "@/types/group";
import { ListButtonContainer, ListItemContainer } from "@/ui/Containers";
import { AddClockers } from "@/components/group/AddClockers";

export function GroupView() {
    const {data: session} = useSession();
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [group, setGroup] = useState<GroupPageItem | null>(null);
    const [showClockers, setShowClockers] = useState<boolean>(false);
    const [showMeetings, setShowMeetings] = useState<boolean>(false);
    const [showAddClockers, setShowAddClockers] = useState<boolean>(false);
    const [noMeetings, setNoMeetings] = useState<boolean>(false);
    const [noClockers, setNoClockers] = useState<boolean>(false);
    const [isKeeper, setIsKeeper] = useState<boolean>(false);
    const [clockers, setClockers] = useState<UserListItem[]>([]);
    const [meetings, setMeetings] = useState<MeetingListItem[]>([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchGroup() {
            try {
                const result = await fetch(`/api/groups/${id}`);
                if (!result.ok) {
                    const error = await result.json();
                    console.error(error.code, error.error);
                    return;
                }
                const group: GroupPageItem = await result.json();
                setGroup(group);
                setIsKeeper(session?.user.id === group?.keeper.id)
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchGroup();
    }, [loading]);


    async function fetchClockers() {
        try {
            const result = await fetch(`/api/groups/${id}/clockers`);
            if (!result.ok) {
                const error = await result.json();
                console.error(error.code, error.error);
                return;
            }
            const clockers: UserListItem[] = await result.json();
            setClockers(clockers);
            setNoClockers(clockers.length === 0);
        } catch (error) {
            console.error(error);
        }
    }

    async function fetchMeetings() {
        try {
            const result = await fetch(`/api/groups/${id}/meetings`);
            if (!result.ok) {
                const error = await result.json();
                console.error(error.code, error.error);
                return;
            }
            const meetings: MeetingListItem[] = await result.json();
            setMeetings(meetings);
            setNoMeetings(meetings.length === 0);
        } catch (error) {
            console.error(error);
        }
    }

    async function removeClocker(clockerId: string) {

        try {
            const remove: string[] = [clockerId];
            const result = await fetch(`/api/groups/${id}/clockers`, {
                method: "DELETE",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ remove: [clockerId] })
            });
            if (!result.ok) {
                const error = await result.json();
                console.error(error.code, error.error );
            }
            await fetchClockers();

        } catch (error) {
        console.error(error);
        }
    }

    if (loading) {
        return (
            <p> ... </p>
        )
    }

    return (
        <div className={`rounded-md w-full border border-foreground-dark, bg-background-light py-2  px-6 max-w-md mx-auto `}>
            <div>
                <H1>{group?.name}</H1>
                <H3>{group?.description}</H3>
                <p>{GroupText.keeperLabel} {group?.keeper.name}</p>
                <p>{GroupText.dateLabel} {group?.createdAt.toString()}</p>
                <CommonButton onClick={() => router.push(`/setup?groupId=${group?.id}&groupName=${group?.name}`, ) }>{GroupText.createNewGroupMeeting}</CommonButton>
            </div>
            <div>
                <div onClick={() => { setShowMeetings(prevState => !prevState); fetchMeetings() }}>
                    <H3>{GroupText.meetingsInGroup} <ChevronIcon isOpen={showMeetings}/></H3>
                </div>
                { showMeetings && meetings.length > 0 && (
                    <List
                        items={meetings.map((meeting) => ({
                            children: <ListItemContainer>{meeting.title}</ListItemContainer>,
                            description: (meeting.startedAt).toString(),
                        }))}
                    />
                )}
                { showMeetings && noMeetings && (
                    <p>No meetings in this group.</p>
                )}

                <div onClick={() => { setShowClockers(prevState => !prevState); fetchClockers(); }}>
                    <H3>{GroupText.clockersInGroup}<ChevronIcon isOpen={showClockers}/></H3>
                </div>

                {showClockers && clockers.length > 0 && (
                    <List
                        items={clockers.map((clocker) => ({
                            children: <>
                                {clocker.name}
                                    { isKeeper && (
                                        <ListButtonContainer>
                                            <ListButton onClick={() => removeClocker(clocker.id)}>{"–"}<Tooltip label={GroupText.removeClocker} /></ListButton>
                                        </ListButtonContainer>
                                    )
                                    }
                            </>
                        }))}
                    />
                )}
                {showClockers && noClockers && (
                    <p>No clockers in this group.</p>
                )}
                {showClockers && (
                    <>
                        <div onClick={() => setShowAddClockers(prevState => !prevState) }>
                            <H3>{GroupText.addClockers}<ChevronIcon isOpen={showAddClockers}/></H3>
                        </div>
                        { showAddClockers && (
                            <AddClockers groupId={id} showAddClockers={showAddClockers} exclude={clockers} onSuccess={fetchClockers}/>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
