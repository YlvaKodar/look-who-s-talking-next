"use client"
type SpeakerButtonProps = {
    formatedTime: string
}

export function TimerDisplay({formatedTime}: SpeakerButtonProps) {
    return (
        <>
            <div className={
                `w-full
                py-2 px-2
                rounded-md
                border-2 border-foreground-dark
                bg-background-dark
                text-center text-foreground-dark text-4xl font-timerOpt
                `
            }
            >
                <div className={
                    `w-full
                py-4 px-6
                rounded-md
                border-2 border-foreground-dark
                bg-background-light
                text-center text-foreground-dark text-4xl font-timerOpt
                `
                }
                >
                    {formatedTime}
                </div>
            </div>

        </>
    )
}