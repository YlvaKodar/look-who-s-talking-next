import { CurrentMeeting, Participants, SpeakingData, Gender, MeetingStats, GenderStats, Stats, MeetingData } from "@/types/meeting";

const genders: Gender[] = ["women", "nonbinary", "men"];

export function createCurrentMeeting(
    title: string,
    startedAt: Date,
    groupId: string | undefined,
    groupName: string | undefined,
    womenCount: number,
    nonbinaryCount: number,
    menCount: number,
): CurrentMeeting {

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
        groupId,
        groupName,
        participants,
        speakingData,
    };
}

export function createCurrentMeetingStats(
    meeting: CurrentMeeting,
): MeetingStats {
    const totalParticipantCount = getParticipantCount(meeting.participants);
    const totalSpeakingTime = getTotalTimeActiveMeeting(meeting);
    const totalSpeakingTimeString = getFormattedTime(totalSpeakingTime);
    const totalStatementCount = getTotalStatementCount(meeting.speakingData)
    const averageStatementLength = totalSpeakingTime / totalStatementCount | 0;
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

export function createMeetingData(
    activeMeeting: CurrentMeeting,
): MeetingData {
    return {
        groupId: activeMeeting.groupId,
        title: activeMeeting.title,
        startedAt: activeMeeting.startedAt,
        womenCount: activeMeeting.participants.women,
        nonbinaryCount: activeMeeting.participants.nonbinary,
        menCount: activeMeeting.participants.men,
        womenSpeakingTime: getGenderSpeakingTime(activeMeeting.speakingData.women),
        nonbinarySpeakingTime: getGenderSpeakingTime(activeMeeting.speakingData.nonbinary),
        menSpeakingTime: getGenderSpeakingTime(activeMeeting.speakingData.men),
        womenStatementCount: activeMeeting.speakingData.women.length,
        nonbinaryStatementCount: activeMeeting.speakingData.nonbinary.length,
        menStatementCount: activeMeeting.speakingData.men.length,
    }
}

export function createPastMeetingStats(
    id: string,
    title: string,
    groupName: string,
    keeperName: string,
    startedAt: string,
    womenCount: number,
    womenSpeakingTime: number,
    womenStatementCount: number,
    nonbinaryCount: number,
    nonbinarySpeakingTime: number,
    nonbinaryStatementCount: number,
    menCount: number,
    menSpeakingTime: number,
    menStatementCount: number,
): MeetingStats {
    const totalParticipantCount = menCount + womenCount + nonbinaryCount;
    const totalSpeakingTime = menSpeakingTime + womenSpeakingTime + nonbinarySpeakingTime;
    const totalSpeakingTimeString = getFormattedTime(totalSpeakingTime);
    const totalStatementCount = womenStatementCount + nonbinaryStatementCount + menStatementCount;
    const averageStatementLength = totalSpeakingTime / totalStatementCount | 0;
    const averageStatementLengthString = getFormattedTime(averageStatementLength);

    const womenShare = ((totalSpeakingTime / totalParticipantCount) * womenCount) | 0;
    const nonbinaryShare = ((totalSpeakingTime / totalParticipantCount) * nonbinaryCount) | 0;
    const menShare = ((totalSpeakingTime / totalParticipantCount) * menCount) | 0;

    const genderStats: GenderStats = {
        women: {
            participating: womenCount,
            speakingTime: womenSpeakingTime,
            speakingTimeString: getFormattedTime(womenSpeakingTime),
            statementCount: womenStatementCount,
            averageStatementLength: womenSpeakingTime / womenStatementCount | 0,
            averageStatementLengthString: getFormattedTime(womenSpeakingTime / womenStatementCount | 0),
            equalShare: womenShare,
            equalShareString: getFormattedTime(womenShare)
        },
        nonbinary: {
            participating: nonbinaryCount,
            speakingTime: nonbinarySpeakingTime,
            speakingTimeString: getFormattedTime(nonbinarySpeakingTime),
            statementCount: nonbinaryStatementCount,
            averageStatementLength: nonbinarySpeakingTime / nonbinaryStatementCount | 0,
            averageStatementLengthString: getFormattedTime(nonbinarySpeakingTime / nonbinaryStatementCount | 0),
            equalShare: nonbinaryShare,
            equalShareString: getFormattedTime(nonbinaryShare)
        },
        men: {
            participating: menCount,
            speakingTime: menSpeakingTime,
            speakingTimeString: getFormattedTime(menSpeakingTime),
            statementCount: menStatementCount,
            averageStatementLength: menSpeakingTime / menStatementCount | 0,
            averageStatementLengthString: getFormattedTime(menSpeakingTime / menStatementCount | 0),
            equalShare: menShare,
            equalShareString: getFormattedTime(menShare)
        },
    };

    return {
        id,
        title: title,
        groupName,
        keeperName,
        startedAt,
        totalParticipantCount,
        totalSpeakingTime,
        totalSpeakingTimeString,
        totalStatementCount,
        averageStatementLength,
        averageStatementLengthString,
        genderStats,
    };
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

export function getTotalTimeActiveMeeting( meeting: CurrentMeeting ) {
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