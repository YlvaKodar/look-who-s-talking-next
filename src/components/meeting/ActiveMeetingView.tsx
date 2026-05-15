"use client"
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
import { ButtonContainer } from "@/ui/Containers";
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
        <div className="w-full max-w-md mx-auto ">
            <H1>{activeMeeting.title}</H1>
            <div className="meeting-controls-container">
                <div className="flex mx-auto">
                    <TimerDisplay formatedTime={formattedTime} />
                </div>
                <div className="w-full py-4">
                    <SpeakerButtons meeting={ activeMeeting } currentSpeaker={ currentSpeaker } onStartSpeaking={ startSpeaking }/>
                </div>
                <ButtonContainer>
                    <PauseButton onPause={ pauseSpeaking }/>
                    <EndButton onEnd={ handleEnd } />
                </ButtonContainer>
            </div>
        </div>
    )
}


