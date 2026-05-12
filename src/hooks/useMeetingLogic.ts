'use client'
import { useState, useEffect } from 'react';
import { useTimer } from "@/hooks/useTimer";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";
import { ActiveMeeting, Gender, Participants, SpeakingData } from "@/types/meeting";


export function useMeetingLogic() {
    const [activeMeeting, setActiveMeeting] = useState<ActiveMeeting | null>(null)
    const [currentSpeaker, setCurrentSpeaker] = useState<Gender | null>(null)
    const { setup, meeting } = useMeetingStorage()
    const { startTimer, stopTimer, spokenTime } = useTimer();

    const loadMeeting = () => {
        setActiveMeeting(setup.load);
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
        console.log( `Gender: ${currentSpeaker}, Time: ${time}` )
        if (currentSpeaker === "women") activeMeeting?.speakingData.women.push(time)
        if (currentSpeaker === "nonbinary") activeMeeting?.speakingData.nonbinary.push(time)
        if (currentSpeaker === "men") activeMeeting?.speakingData.men.push(time)

        if (activeMeeting) meeting.save(activeMeeting)
        setActiveMeeting(activeMeeting)
    }

    const pauseSpeaking = () => {
        loggSpeaking(spokenTime)
        setCurrentSpeaker(null)
        stopTimer();
    }
    const endMeeting = () => {
        stopTimer()
        if (activeMeeting) meeting.save(activeMeeting)
    }

    return { activeMeeting, currentSpeaker, startSpeaking, pauseSpeaking, endMeeting }
}