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
    id?: string;
    name?: string;
    groupId?: string;
    groupName?: string;
    keeperId?: string;
    keeperName?: string;
    createdAt?: string;
    totalParticipantCount: number,
    totalSpeakingTime: number,
    totalSpeakingTimeString: string,
    totalStatementCount: number,
    averageStatementLength: number,
    averageStatementLengthString: string,
    genderStats: GenderStats,
}

export type CurrentMeeting = {
    title: string;
    startedAt: Date;
    groupId?: string;
    participants: Participants
    speakingData: SpeakingData
}

export type MeetingListItem = {
    id: string
    title: string
    startedAt: Date
}

export type MeetingData = {
    groupId?: string;
    title: string;
    startedAt: Date;
    womenCount: number;
    nonbinaryCount: number;
    menCount: number;
    womenSpeakingTime: number;
    nonbinarySpeakingTime: number;
    menSpeakingTime : number;
    womenStatementCount: number;
    nonbinaryStatementCount: number;
    menStatementCount: number;
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
    womenSpeakingTime: number;
    nonbinarySpeakingTime: number;
    menSpeakingTime : number;
    womenStatementCount: number;
    nonbinaryStatementCount: number;
    menStatementCount: number;
}