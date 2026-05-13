export type Gender = 'women' | 'nonbinary' | 'men'
export type SpeakingData = Record<Gender, number[]>
export type Participants = Record<Gender, number>
export type GenderStats = Record<Gender, Stats>

export type Stats = {
    participating: number
    speakingTime: number,
    speakingTimeString: string,
    statementCount: number,
    averageStatementLength: number,
    averageStatementLengthString: string,
    equalShare: number
    equalShareString: string,
}

export type MeetingStats = {
    totalParticipantCount: number,
    totalSpeakingTime: number,
    totalSpeakingTimeString: string,
    totalStatementCount: number,
    averageStatementLength: number,
    averageStatementLengthString: string,
    genderStats: GenderStats,
}

export type ActiveMeeting = {
    title: string;
    startedAt: Date;
    participants: Participants
    speakingData: SpeakingData
}

export type PastMeeting = {
    id: string;
    createdAt: Date;
    keeperId: string;
    groupId?: string;
    title: string;
    startedAt: Date;
    womenCount: number;
    nonbinaryCount: number;
    menCount: number;
    totalSpeakingTime: number;
    womenSpeakingTime: number;
    nonbinarySpeakingTime: number;
    menSpeakingTime : number;
    totalStatementCount: number;
    womenStatementCount: number;
    nonbinaryStatementCount: number;
    menStatementCount: number;
}