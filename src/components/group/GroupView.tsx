"use client"
import {authClient, useSession} from "@/lib/auth-client";
import { H1, H3 } from "@/ui/Headings"
import {CommonButton, ListButton} from "@/ui/Buttons";
import { DashboardText } from "@/constants/constants";
import { useState, useEffect } from "react";
import { List } from "@/ui/Lists";
import { MeetingListItem } from "@/types/meeting"
import { UserListItem } from "@/types/user";
import { ChevronIcon } from "@/ui/Common";
import { useParams } from 'next/navigation';
import {GroupPageItem} from "@/types/group";
import {ListButtonContainer, ListItemContainer} from "@/ui/Containers";


export function GroupView() {
    const {data: session} = useSession();
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [group, setGroup] = useState<GroupPageItem | null>(null);
    const [showClockers, setShowClockers] = useState<boolean>(false);
    const [showMeetings, setShowMeetings] = useState<boolean>(false);
    const [noMeetings, setNoMeetings] = useState<boolean>(false);
    const [noClockers, setNoClockers] = useState<boolean>(false);
    const [isKeeper, setIsKeeper] = useState<boolean>(false);

    const [clockers, setClockers] = useState<UserListItem[]>([]);
    const [meetings, setMeetings] = useState<MeetingListItem[]>([]);

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
                <p>{DashboardText.keeperLabel} {group?.keeper.name}</p>
                <p>{DashboardText.dateLabel} {group?.createdAt.toString()}</p>
                <CommonButton>{DashboardText.createNewGroup}</CommonButton>
            </div>
            <div>
                <div onClick={() => { setShowMeetings(prevState => !prevState); fetchMeetings() }}>
                    <H3>{DashboardText.meetingsInGroup} <ChevronIcon isOpen={showMeetings}/></H3>
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
                    <H3>{DashboardText.clockersInGroup}<ChevronIcon isOpen={showClockers}/></H3>
                </div>

                {showClockers && clockers.length > 0 && (
                    <List
                        items={clockers.map((clocker) => ({
                            children: <ListItemContainer>
                                <div className={`flex flex-row w-full`}>{clocker.name}
                                    { isKeeper && (
                                        <ListButtonContainer>
                                            <ListButton onClick={() => console.log("add remove") }>{"Remove"}</ListButton>
                                        </ListButtonContainer>
                                        )
                                    }

                                </div>
                            </ListItemContainer>,
                        }))}
                    />
                )}
                {showClockers && noClockers && (
                    <p>No clockers in this group.</p>
                )}

            </div>
        </div>
    )
}
