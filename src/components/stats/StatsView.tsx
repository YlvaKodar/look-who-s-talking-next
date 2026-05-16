"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { StatsText } from "@/constants/constants";
import { StatsPresentation } from "@/components/stats/StatsPresentation";

import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { createMeetingStats, getPresentGenders } from "../../utils/meetingUtil";
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
            <H1>{StatsText.heading}</H1>

            <div className="stats-container">




                <StatsPresentation meetingStats={meetingStats} presentGenders={presentGenders} />
            </div>

            {/*<div id="stats-actions">*/}
            {/*    <button id="export-pdf-btn" className="tertiary"></button>*/}
            {/*    <button id="back-to-start">Start</button>*/}
            {/*</div>*/}

        </div>
    )
}