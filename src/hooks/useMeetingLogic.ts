'use client'
import { useState, useEffect } from 'react';
import { useTimer } from "@/hooks/useTimer";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { CurrentMeeting, Gender } from "@/types/meeting";

export function useMeetingLogic() {
    const [activeMeeting, setActiveMeeting] = useState<CurrentMeeting | null>(null)
    const [currentSpeaker, setCurrentSpeaker] = useState<Gender | null>(null)
    const { setup, meeting } = useMeetingStorage()
    const { startTimer, stopTimer, tickingSec } = useTimer();

    const loadMeeting = () => {
        if (!setup.isLoaded) return null;
        setActiveMeeting(setup.storedValue);
    }

    useEffect(() => {
        loadMeeting()
    }, [setup.isLoaded]);

    const startSpeaking = (gender: Gender) => {
        const statementTime = stopTimer()
        loggSpeaking(statementTime, currentSpeaker, activeMeeting);
        setCurrentSpeaker(gender)
        startTimer();
    }

    const loggSpeaking = (time : number, gender: Gender | null, theMeeting: CurrentMeeting | null ) => {
        if (time === 0) return
        if (!gender) return
        if (!theMeeting) return

        console.log( `Gender: ${gender}, Time: ${time}` )

        const updatedMeeting: CurrentMeeting = {
            ...theMeeting,
            speakingData: {
                ...theMeeting.speakingData,
                [gender] : [...theMeeting.speakingData[gender], time],
            }
        }
        meeting.save(updatedMeeting)
        setActiveMeeting(updatedMeeting)
    }

    const pauseSpeaking = () => {
        const statementTime = stopTimer()
        loggSpeaking(statementTime, currentSpeaker, activeMeeting);
        setCurrentSpeaker(null)
    }

    const endMeeting = () => {
        const statementTime = stopTimer()
        loggSpeaking(statementTime, currentSpeaker, activeMeeting);
    }

    const formattedTime = `${String(Math.floor(tickingSec / 60)).padStart(2, '0')}:${String(Math.floor(tickingSec % 60)).padStart(2, '0')}`;

    return { activeMeeting, currentSpeaker, startSpeaking, pauseSpeaking, endMeeting, formattedTime }
}