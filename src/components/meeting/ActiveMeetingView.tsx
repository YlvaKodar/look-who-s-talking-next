"use client"

import { SpeakerButtons, PauseButton, EndButton } from "@/components/meeting/MeetingButtons";
import { TimerDisplay } from "@/components/meeting/TimerDisplay";
import { useMeetingLogic } from "@/hooks/useMeetingLogic";
import { useRouter } from "next/navigation";

export function ActiveMeetingView() {
    const { activeMeeting, currentSpeaker, startSpeaking, pauseSpeaking, endMeeting, formattedTime } = useMeetingLogic()
    const router = useRouter();


    function handleEnd() {
        endMeeting();
        router.push('/stats');
    }

    if (!activeMeeting) {
        return (
         <p> ... </p>
        )
    }

    return (
        <div>
            <h1 id="meeting-title" className="primary">{activeMeeting.title}</h1>
            <div id="meeting-controls-container">
                <div>
                    <TimerDisplay formatedTime={formattedTime} />
                </div>
                <div>
                    <SpeakerButtons meeting={ activeMeeting } currentSpeaker={ currentSpeaker } onStartSpeaking={ startSpeaking }/>
                </div>
                <div className="control-buttons">
                    <PauseButton onPause={ pauseSpeaking }/>
                    <EndButton onEnd={ handleEnd } />
                </div>
            </div>
        </div>
    )
}


