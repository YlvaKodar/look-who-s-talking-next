"use client"
import { H1, H3 } from "@/ui/Headings"
import { CommonButton } from "@/ui/Buttons";
import { DashboardText } from "@/constants/constants";
import { useState, useEffect } from "react";
import { List } from "@/ui/Lists";
import { MeetingListItem } from "@/types/meeting"
import { UserListItem } from "@/types/user";
import { ChevronIcon } from "@/ui/Common";
import { useParams } from 'next/navigation';
import {GroupPageItem} from "@/types/group";


export function GroupView() {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [group, setGroup] = useState<GroupPageItem | null>(null);
    const [showClockers, setShowClockers] = useState<boolean>(false);
    const [showMeetings, setShowMeetings] = useState<boolean>(false);
    const [meetingLoaded, setMeetingLoaded] = useState<boolean>(false);
    const [clockersLoaded, setClockersLoaded] = useState<boolean>(false);

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
                const group = await result.json();
                setGroup(group);
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

        } catch (error) {
            console.error(error);
        }
        setClockersLoaded(true);
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

        } catch (error) {
            console.error(error);
        }
        setMeetingLoaded(true);
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
                { showMeetings && meetings.length < 0 && (
                    <List
                        items={meetings.map((meeting) => ({
                            text: meeting.title,
                            description: (meeting.startedAt).toString(),
                        }))}
                    />
                )}
                { showMeetings && meetingLoaded && meetings.length === 0 && (
                    <p>No meetings in this group.</p>
                )}

                <div onClick={() => { setShowClockers(prevState => !prevState); fetchClockers(); }}>
                    <H3>{DashboardText.clockersInGroup}<ChevronIcon isOpen={showClockers}/></H3>
                </div>

                {showClockers && clockers.length > 0 && (
                    <List
                        items={clockers.map((clocker) => ({
                            text: clocker.name,
                        }))}
                    />
                )}
                {showClockers && clockersLoaded && clockers.length === 0 && (
                    <p>No clockers in this group.</p>
                )}

            </div>
        </div>
    )
}
