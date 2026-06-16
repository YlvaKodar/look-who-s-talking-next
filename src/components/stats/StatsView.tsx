"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { StatsPresentation } from "@/components/stats/StatsPresentation";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { createCurrentMeetingStats, getPresentGenders } from "@/utils/meetingUtil";
import { MeetingStats } from "@/types/meeting";
import {LoadingIndicator} from "@/ui/Common";
import { CommonButton } from "../ui/Buttons";
import {useRouter} from "next/navigation";
import {ButtonContainer} from "@/ui/Containers";

export function StatsView() {
    const { meeting } = useMeetingStorage();
    const router = useRouter();
    if (!meeting.isLoaded) return null;

    const endedMeeting = meeting.storedValue;

    if (!endedMeeting) {
        return (
            <LoadingIndicator/>
        )
    }
    const presentGenders = getPresentGenders(endedMeeting.participants);
    const meetingStats: MeetingStats = createCurrentMeetingStats(endedMeeting);
    const startedAt = new Date(endedMeeting.startedAt).toLocaleDateString("sv-SE");

    return(
        <div className="flex flex-col">
            <H1>{endedMeeting.title}</H1>
            <H3>{startedAt}</H3>
            <StatsPresentation meetingStats={meetingStats} presentGenders={presentGenders} />

            {/*    <button id="export-pdf-btn" className="tertiary"></button>*/}
            <ButtonContainer>
                <CommonButton type={"button"} onClick={() => router.push(`/`) }>Back to start</CommonButton>
            </ButtonContainer>
        </div>
    )
}