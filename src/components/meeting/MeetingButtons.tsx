"use client"
import { ActiveMeeting, Gender } from "@/types/meeting";
import {Genders, MeetingText} from "@/constants/constants";
import { getPresentGenders } from "@/util/meetingUtil";

type SpeakerButtonProps = {
    meeting: ActiveMeeting,
    currentSpeaker: Gender | null,
    onStartSpeaking: (gender: Gender) => void
}

export function SpeakerButtons ({ meeting, currentSpeaker, onStartSpeaking} : SpeakerButtonProps) {
    const presentGenders = getPresentGenders(meeting.participants)


    return (
        <div className="speaker-buttons">
            {presentGenders.map(gender => (
                <button
                key={gender}
                className={`speaker-btn ${gender} ${currentSpeaker === gender ? 'active' : ''}`}
                onClick={() => onStartSpeaking(gender) }
                >
                    {Genders.buttonLabels[gender]}
                </button>
            ))}
        </div>
    )
}

type PauseButtonProps = {
    onPause: () => void
}

export function PauseButton ({ onPause }: PauseButtonProps) {

    return (
        <>
            <button
                key={"pause-meeting"}
                className={"secondary"}
                onClick={onPause}>
                {MeetingText.pauseButton}
            </button>
        </>
    )
}

type EndButtonProps = {
    onEnd: () => void
}
export function EndButton ({ onEnd }: EndButtonProps) {

    return (
        <>
            <button
                key={"pause-meeting"}
                className={"secondary"}
                onClick={onEnd}>
                {MeetingText.endButton}
            </button>
        </>
    )
}