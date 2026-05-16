"use client"
import { H3 } from "@/components/ui/Headings";
import { PieStats } from "@/components/stats/PieStats";
import { StatsText, Genders } from "@/constants/constants";
import {  MeetingStats, Stats, Gender } from "@/types/meeting";


type TextStatsProps = {
    meetingStats: MeetingStats;
    presentGenders: Gender[];
}

export function StatsPresentation({ meetingStats, presentGenders }: TextStatsProps) {

    return (
        <div className={`w-full flex flex-col gap-2`}>
            <div className={`w-full flex flex-col gap-2 rounded-md border border-foreground-dark bg-background-light px-4 pb-4`}>
                <H3>{StatsText.participantCount}{meetingStats.totalParticipantCount}</H3>
                <p>{StatsText.totalSpeakingTime} {meetingStats.totalSpeakingTimeString}</p>
                <p>{StatsText.totalStatementCount}{meetingStats.totalStatementCount}</p>
                <p>{StatsText.averageLength}{meetingStats.averageStatementLengthString}</p>
                <PieStats meetingStats={meetingStats} presentGenders={presentGenders} />
            </div>
            <div className={`w-full flex flex-col gap-2`}>
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
    const variants = {
        women: "border-women-dark",
        nonbinary: "border-nonbinary-dark",
        men: "border-men-dark"
    }

    return (
        <div className={`border ${variants[gender]} rounded-md bg-background-light w-full px-4 pb-4`}>
            <div>
                <H3 color={gender}>{ Genders.chartLabels[gender]}: {stats.participating}</H3>
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

