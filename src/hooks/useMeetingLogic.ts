'use client'
import { useState, useEffect } from 'react';
import { useTimer } from "@/hooks/useTimer";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { ActiveMeeting, Gender } from "@/types/meeting";


export function useMeetingLogic() {
    const [activeMeeting, setActiveMeeting] = useState<ActiveMeeting | null>(null)
    const [currentSpeaker, setCurrentSpeaker] = useState<Gender | null>(null)
    const { setup, meeting } = useMeetingStorage()
    const { startTimer, stopTimer, spokenTime } = useTimer();

    const loadMeeting = () => {
        setActiveMeeting(setup.load());
    }

    useEffect(() => {
        loadMeeting()
    }, []);

    const startSpeaking = (gender: Gender) => {
        loggSpeaking(spokenTime);
        setCurrentSpeaker(gender)
        startTimer();
    }

    const loggSpeaking = (time : number) => {
        if (time === 0) return
        if (!currentSpeaker) return
        if (!activeMeeting) return

        console.log( `Gender: ${currentSpeaker}, Time: ${time}` )

        const updatedMeeting: ActiveMeeting = {
            ...activeMeeting,
            speakingData: {
                ...activeMeeting.speakingData,
                [currentSpeaker] : [...activeMeeting.speakingData[currentSpeaker], time],
            }
        }
        meeting.save(updatedMeeting)
        setActiveMeeting(updatedMeeting)
    }

    const pauseSpeaking = () => {
        loggSpeaking(spokenTime);
        setCurrentSpeaker(null)
        stopTimer();
    }
    const endMeeting = () => {
        loggSpeaking(spokenTime);
        stopTimer()
        if (activeMeeting) meeting.save(activeMeeting)
    }

    const formattedTime = `${String(Math.floor(spokenTime / 60)).padStart(2, '0')}:${String(Math.floor(spokenTime % 60)).padStart(2, '0')}`;

    return { activeMeeting, currentSpeaker, startSpeaking, pauseSpeaking, endMeeting, formattedTime }
}