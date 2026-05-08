export type Gender = 'women' | 'nonbinary' | 'men'
export type SpeakingData = Record<Gender, number[]>
export type Participants = Record<Gender, number>

export type ActiveMeeting = {
    title: string;
    startedAt: string;
    participants: Participants
    speakingData: SpeakingData
}

export type Meeting = {
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