"use client"

type SpeakerButtonProps = {
    formatedTime: string
}

export function TimerDisplay({formatedTime}: SpeakerButtonProps) {
    return (
        <>
            <div id="timer-display" className="primary">{formatedTime}</div>
        </>
    )
}