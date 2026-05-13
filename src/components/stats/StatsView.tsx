"use client"
import { StatsText } from "@/constants/constants";
import { TextStats } from "@/components/stats/TextStats";
import { PieStats } from "@/components/stats/PieStats";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { createMeetingStats, getPresentGenders } from "@/util/meetingUtil";
import { MeetingStats } from "@/types/meeting";

export function StatsView() {
    const { meeting } = useMeetingStorage();
    const endedMeeting = meeting.load()

    if (!endedMeeting) {
        return (
            <p> ... </p>
        )
    }

    const presentGenders = getPresentGenders(endedMeeting.participants);
    const meetingStats: MeetingStats = createMeetingStats(endedMeeting);

    return(
        <div>
            <h1 id="stats_heading" className="primary">{StatsText.heading}</h1>

            <div className="stats-container">

                <div className="chart-container">
                    <PieStats meetingStats={meetingStats} presentGenders={presentGenders} />
                </div>
                <TextStats meetingStats={meetingStats} presentGenders={presentGenders} />
            </div>

            {/*<div id="stats-actions">*/}
            {/*    <button id="export-pdf-btn" className="tertiary"></button>*/}
            {/*    <button id="back-to-start">Start</button>*/}
            {/*</div>*/}

        </div>
    )
}