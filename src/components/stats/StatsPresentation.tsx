"use client"
import { H3 } from "@/components/ui/Headings";
import { PieStats } from "@/components/stats/PieStats";
import { StatsText, Genders } from "@/constants/constants";
import {  MeetingStats, Stats, Gender } from "@/types/meeting";
import {BigSectionContainer, SimpleContainer} from "@/ui/Containers";


type TextStatsProps = {
    meetingStats: MeetingStats;
    presentGenders: Gender[];
}

export function StatsPresentation({ meetingStats, presentGenders }: TextStatsProps) {

    return (
        <div className={`w-full flex flex-col gap-2`}>
            <BigSectionContainer>
                <H3>{StatsText.participantCount}{meetingStats.totalParticipantCount}</H3>
                <p>{StatsText.totalSpeakingTime} {meetingStats.totalSpeakingTimeString}</p>
                <p>{StatsText.totalStatementCount}{meetingStats.totalStatementCount}</p>
                <p>{StatsText.averageLength}{meetingStats.averageStatementLengthString}</p>
                <PieStats meetingStats={meetingStats} presentGenders={presentGenders} />
            </BigSectionContainer>
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
        <div className={`border ${variants[gender]} rounded-md bg-bglight w-full px-4 pb-4`}>
            <div>
                <H3 color={gender}>{ Genders.chartLabels[gender]}: {stats.participating}</H3>
            </div>
            <SimpleContainer>
                <p>{StatsText.speakingTime} {stats.speakingTimeString}</p>
            </SimpleContainer>
            <SimpleContainer>
                <p>{StatsText.statementCount} {stats.statementCount}</p>
            </SimpleContainer>
            <SimpleContainer>
                <p>{StatsText.averageLength} {stats.averageStatementLengthString}</p>
            </SimpleContainer>
            <SimpleContainer>
                <p>{StatsText.equalTimeShare} {stats.equalShareString}</p>
            </SimpleContainer>
        </div>
    )
}

