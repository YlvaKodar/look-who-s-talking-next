"use client"
import { H1, H4 } from "@/components/ui/Headings";
import { ButtonContainer } from "@/ui/Containers";
import { SpeakerButtons, PauseButton, EndButton } from "@/components/timer/TimerButtons";
import { TimerDisplay } from "@/components/timer/TimerDisplay";
import { useMeetingLogic } from "@/hooks/useMeetingLogic";
import { useRouter } from "next/navigation";
import { authClient} from "@/lib/auth-client";
import { createMeetingData } from "@/utils/meetingUtil";
import {Activity} from "react";

export function TimerView() {
    const { activeMeeting, currentSpeaker, startSpeaking, pauseSpeaking, endMeeting, formattedTime } = useMeetingLogic()
    const router = useRouter();
    const { data: session } = authClient.useSession();

    async function handleEnd() {
        endMeeting();

        //Todo: give chance to change stuff if not okay?
        if (session && activeMeeting) {
            const meetingData = createMeetingData(activeMeeting);

            try {
                const result = await fetch("/api/meetings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(meetingData),
                });

                if (!result.ok) {
                    const error = await result.json();
                    console.error(error.code, error.error );
                }

            } catch (error) {
                console.error(error);
            }
        }
        router.push('/stats');
    }

    if (!activeMeeting) {
        return (
         <p> ... </p>
        )
    }

    return (
        <div className={`rounded-md w-full border border-foreground-dark, bg-background-light py-2  px-6 max-w-md mx-auto `}>
            <H1>{activeMeeting.title}</H1>
            { activeMeeting.groupName && (
                <H4>{activeMeeting.groupName}</H4>
            )}
            <div >
                <div className={`flex mx-auto py-2 `}>
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


