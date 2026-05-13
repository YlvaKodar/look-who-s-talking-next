"use client"
import { StatsText } from "@/constants/constants";
import { ActiveMeeting, MeetingStats, GenderStats, Stats, Gender } from "@/types/meeting";
import { getPresentGenders, createMeetingStats, getParticipantCount, getTotalTimeActiveMeeting, getFormattedTime } from "@/util/meetingUtil";


type TextStatsProps = {
    meeting: ActiveMeeting;
}

export function TextStats({ meeting }: TextStatsProps) {
    const presentGenders = getPresentGenders(meeting.participants);
    const meetingStats: MeetingStats = createMeetingStats(meeting);

    return (
        <div className="text-stats">
            <h3 id="participant-count" className="tertiary">{StatsText.participantCount}{meetingStats.totalParticipantCount}</h3>
            <h3 className="tertiary">{StatsText.totalSpeakingTime} <span id="total-time">{meetingStats.totalSpeakingTimeString}</span></h3>
            <h3 id="participant-count" className="tertiary">{StatsText.totalStatementCount}{meetingStats.totalStatementCount}</h3>
            <h3 id="participant-count" className="tertiary">{StatsText.averageLength}{meetingStats.averageStatementLengthString}</h3>
            <div id="gender-stats">
                {presentGenders.map(gender => (
                    <GenderTextStats key={gender} gender={gender} stats={meetingStats.genderStats[gender]} />

                ))}
            </div>
        </div>
    )
}

type GenderStatsProps = {
    gender: Gender;
    stats: Stats;
}
function GenderTextStats({ gender, stats }: GenderStatsProps) {

    return (
        <div className="text-stats">
            <div>
                <h3 className="tertiary">{ gender } {stats.participating}</h3>
            </div>
            <div>
                <p>{StatsText.speakingTime} {stats.speakingTimeString}</p>
            </div>
            <div>
                <p>{StatsText.statementCount} {stats.statementCount}</p>
            </div>
            <div>
                <p>{StatsText.averageLength} {stats.averageStatementLengthString}</p>
            </div>
            <div>
                <p>{StatsText.equalTimeShare} {stats.equalShareString}</p>
            </div>
        </div>
    )
}

