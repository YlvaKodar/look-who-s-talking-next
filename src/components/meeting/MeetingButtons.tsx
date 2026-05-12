"use client"
import { ActiveMeeting, Gender } from "@/types/meeting";
import { MeetingView }  from "@/constants/constants";

type SpeakerButtonProps = {
    meeting: ActiveMeeting,
    currentSpeaker: Gender | null,
    onStartSpeaking: (gender: Gender) => void
}

export function SpeakerButtons ({ meeting, currentSpeaker, onStartSpeaking} : SpeakerButtonProps) {
    const genders: Gender[] = ["women", "nonbinary", "men"]
    const presentGenders = genders.filter((gender) => (meeting.participants[gender] > 0));

    return (
        <div className="speaker-buttons">
            {presentGenders.map(gender => (
                <button
                key={gender}
                className={`speaker-btn ${gender} ${currentSpeaker === gender ? 'active' : ''}`}
                onClick={() => onStartSpeaking(gender) }
                >
                    {gender}
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
                {MeetingView.pauseButton}
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
                {MeetingView.endButton}
            </button>
        </>
    )
}