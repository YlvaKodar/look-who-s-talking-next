"use client"
import { CurrentMeeting, Gender } from "@/types/meeting";
import {Genders, MeetingText} from "@/constants/constants";
import { getPresentGenders } from "@/utils/meetingUtil";
import { CommonButton } from "@/ui/Buttons";
import {VARIANTS} from "@/constants/CONFIG";

type SpeakerButtonProps = {
    meeting: CurrentMeeting,
    currentSpeaker: Gender | null,
    onStartSpeaking: (gender: Gender) => void
}

const variants = {
    women: {
        base: VARIANTS.women.base,
        active: VARIANTS.women.active
    },
    nonbinary: {
        base: VARIANTS.nonbinary.base,
        active: VARIANTS.nonbinary.active
    },
    men: {
        base: VARIANTS.men.base,
        active: VARIANTS.men.active
    }
}

export function SpeakerButtons ({ meeting, currentSpeaker, onStartSpeaking} : SpeakerButtonProps) {
    const presentGenders = getPresentGenders(meeting.participants)

    return (
        <div className="flex flex-col w-full gap-y-3">
            {presentGenders.map(gender => {
                const isActive = currentSpeaker === gender
                return (
                    <button
                        key={gender}
                        className={`
                            py-6 font-bold rounded-md w-full transition-all
                            ${isActive ? variants[gender].active : variants[gender].base}
                        `}
                        onClick={() => onStartSpeaking(gender)}
                    >
                        {Genders.buttonLabels[gender]}
                    </button>
                )
            })}
        </div>
    )
}

type PauseButtonProps = {
    onPause: () => void
}

export function PauseButton ({ onPause }: PauseButtonProps) {

    return (
        <>
            <CommonButton
                key={"pause-meeting"}
                variant={"tertiary"}
                onClick={onPause}>
                {MeetingText.pauseButton}
            </CommonButton>
        </>
    )
}

type EndButtonProps = {
    onEnd: () => void
}
export function EndButton ({ onEnd }: EndButtonProps) {

    return (
        <>
            <CommonButton
                key={"pause-meeting"}
                variant={"tertiary"}
                onClick={onEnd}>
                {MeetingText.endButton}
            </CommonButton>
        </>
    )
}