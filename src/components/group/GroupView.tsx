"use client"
import { H1, H3 } from "@/ui/Headings"
import { CommonButton } from "@/ui/Buttons";
import { DashboardText } from "@/constants/constants";
import { useState } from "react";
import { List } from "@/ui/Lists";
import { MeetingListItem } from "@/types/meeting"
import { UserListItem } from "@/types/user";
import { ChevronIcon } from "@/ui/Common";
import { useParams } from 'next/navigation';

export function GroupView() {
    const { id } = useParams();
    const [showClockers, setShowClockers] = useState<boolean>(false);
    const [showMeetings, setShowMeetings] = useState<boolean>(false);
    const [clockers, setClockers] = useState<UserListItem[]>([]);
    const [meetings, setMeetings] = useState<MeetingListItem[]>([]);

    async function fetchClockers() {
        try {
            const result = await fetch(`/api/groups/${id}`);
            if (!result.ok) {
                const error = await result.json();
                console.error(error.code, error.error);
                return;
            }
            const klockers: UserListItem[] = await result.json();
            setClockers(klockers);

        } catch (error) {
            console.error(error);
        }
    }

    async function fetchMeetings() {
        try {
            const result = await fetch(`/api/groups?status=${status}`);
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
    }

    return (
        <div className={`rounded-md w-full border border-foreground-dark, bg-background-light py-2  px-6 max-w-md mx-auto `}>
            <div>
                <H1>{DashboardText.headingGroups}</H1>
                <CommonButton>{DashboardText.createNewGroup}</CommonButton>
            </div>
            <div>
                <div onClick={() => { setShowMeetings(prevState => !prevState); fetchMeetings() }}>
                    <H3>{DashboardText.keeperGroups} <ChevronIcon isOpen={showMeetings}/></H3>
                </div>

                {showClockers && (
                    <List
                        items={clockers.map((clocker) => ({
                            text: clocker.name,
                        }))}
                    />
                )}

                <div onClick={() => { setShowClockers(prevState => !prevState); fetchClockers(); }}>
                    <H3>{DashboardText.clockerGroups}<ChevronIcon isOpen={showClockers}/></H3>
                </div>

                { showMeetings && (
                    <List
                        items={meetings.map((meeting) => ({
                            text: meeting.title,
                            description: (meeting.startedAt).toString(),
                        }))}
                    />
                )
                }
            </div>
        </div>
    )
}