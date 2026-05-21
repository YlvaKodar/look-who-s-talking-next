"use client"
import {useSession} from "@/lib/auth-client";
import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {MeetingStats, Gender, Stats} from "@/types/meeting";
import {H1, H3} from "@/ui/Headings";
import {StatsPresentation} from "@/components/stats/StatsPresentation";
import {LoadingIndicator} from "@/ui/Common";


export function MeetingView() {
    const {data: session} = useSession();
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [meeting, setMeeting] = useState<MeetingStats | null>(null);

    useEffect(() => {
        async function fetchMeeting(){
            try {
                const result = await fetch(`/api/meetings/${id}`);
                if (!result.ok) {
                    const error = await result.json();
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

    if (!meeting) {
        return (
            <LoadingIndicator/>
        )
    }

    const presentGenders = (Object.entries(meeting?.genderStats) as [Gender, Stats][])
        .filter(([_, stats]) => stats.participating > 0)
        .map(([gender]) => gender);

    return (
        <div>
            <div>
                <H1>{meeting.title}</H1>
                <H3>{meeting?.groupName} {meeting.startedAt}</H3>
                <StatsPresentation meetingStats={meeting} presentGenders={presentGenders} />

                {/*<div id="stats-actions">*/}
                {/*    <button id="export-pdf-btn" className="tertiary"></button>*/}
                {/*    <button id="back-to-start">Start</button>*/}
                {/*</div>*/}

            </div>
        </div>
    )
}