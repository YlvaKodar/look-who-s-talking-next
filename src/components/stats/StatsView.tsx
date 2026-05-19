"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { StatsText } from "@/constants/constants";
import { StatsPresentation } from "@/components/stats/StatsPresentation";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { createCurrentMeetingStats, getPresentGenders } from "@/utils/meetingUtil";
import { MeetingStats } from "@/types/meeting";

export function StatsView() {
    const { meeting } = useMeetingStorage();
    if (!meeting.isLoaded) return null;

    const endedMeeting = meeting.storedValue;

    if (!endedMeeting) {
        return (
            <p> ... </p>
        )
    }
    const presentGenders = getPresentGenders(endedMeeting.participants);
    const meetingStats: MeetingStats = createCurrentMeetingStats(endedMeeting);

    return(
        <div>
            <H1>{endedMeeting.title}</H1>
            <H3>{endedMeeting.startedAt.toLocaleDateString("sv-SE")}</H3>
            <StatsPresentation meetingStats={meetingStats} presentGenders={presentGenders} />

            {/*<div id="stats-actions">*/}
            {/*    <button id="export-pdf-btn" className="tertiary"></button>*/}
            {/*    <button id="back-to-start">Start</button>*/}
            {/*</div>*/}

        </div>
    )
}