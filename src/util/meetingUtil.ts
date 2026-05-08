import { ActiveMeeting, Participants, SpeakingData } from "@/types/meeting";

export function createActiveMeeting(
    title: string,
    startedAt: string,
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