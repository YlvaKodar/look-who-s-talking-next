import { ActiveMeeting, Participants, SpeakingData, Gender, MeetingStats, GenderStats, Stats } from "@/types/meeting";

const genders: Gender[] = ["women", "nonbinary", "men"];

export function createActiveMeeting(
    title: string,
    startedAt: Date,
    womenCount: number,
    nonbinaryCount: number,
    menCount: number,
): ActiveMeeting {

    const participants: Participants = {
        women: womenCount,
        nonbinary: nonbinaryCount,
        men: menCount,
    };

    const speakingData: SpeakingData = {
        women: [],
        nonbinary: [],
        men: [],
    };

    return {
        title,
        startedAt,
        participants,
        speakingData,
    };
}

export function createMeetingStats(
    meeting: ActiveMeeting,
): MeetingStats {
    const totalParticipantCount = getParticipantCount(meeting.participants);
    const totalSpeakingTime = getTotalTimeActiveMeeting(meeting);
    const totalSpeakingTimeString = getFormattedTime(totalSpeakingTime);
    const totalStatementCount = getTotalStatementCount(meeting.speakingData)
    const averageStatementLength = totalStatementCount / totalStatementCount | 0;
    const averageStatementLengthString = getFormattedTime(averageStatementLength);

    const genderStats = genders.reduce((acc, gender) => {
        const participants = meeting.participants[gender];
        const equalShare = (totalSpeakingTime / totalParticipantCount) * participants;
        acc[gender] = createStats(participants, meeting.speakingData[gender], equalShare);
        return acc;
    }, {} as GenderStats);

    return {
        totalParticipantCount,
        totalSpeakingTime,
        totalSpeakingTimeString,
        totalStatementCount,
        averageStatementLength,
        averageStatementLengthString,
        genderStats,
    }
}

function createStats(
    participants: number,
    speakingData: number[],
    equalShare: number,
): Stats {
    const statementCount = speakingData.length;
    const speakingTime = getGenderSpeakingTime(speakingData);
    const speakingTimeString = getFormattedTime(speakingTime)
    const averageStatementLength = speakingTime / statementCount | 0;
    const averageStatementLengthString = getFormattedTime(averageStatementLength)
    const equalShareString = getFormattedTime(equalShare);
    return {
        participating: participants,
        speakingTime,
        speakingTimeString,
        statementCount,
        averageStatementLength,
        averageStatementLengthString,
        equalShare,
        equalShareString
    }
}

export function getPresentGenders(participants : Participants) {
    return genders.filter((gender) => (participants[gender] > 0));
}

export function getParticipantCount(participants : Participants) {
    return participants.women + participants.nonbinary + participants.men;
}

export function getTotalStatementCount(speakingData : SpeakingData) {
    return speakingData.women.length + speakingData.nonbinary.length + speakingData.men.length;
}

export function getTotalTimeActiveMeeting( meeting: ActiveMeeting ) {
    return genders.reduce((sum, gender) => {
        return sum + getGenderSpeakingTime(meeting.speakingData[gender]);
    }, 0);
}

export function getGenderSpeakingTime(genderData: number[]){
    return genderData.reduce((sum, n) => sum + n, 0);
}

export function getFormattedTime(time: number){
    if (time >= 3600){
        return `${String(Math.floor(time / 3600)).padStart(2, '0')}:
        ${String(Math.floor((time % 3600) / 60)).padStart(2, '0')}:
        ${String(Math.floor(time % 60)).padStart(2, '0')}`;
    }
    return `${String(Math.floor(time / 60))
        .padStart(2, '0')}:
        ${String(Math.round(time % 60))
        .padStart(2, '0')}`;
}
