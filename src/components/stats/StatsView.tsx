"use client"
import { StatsText } from "@/constants/constants";
import { TextStats } from "@/components/stats/TextStats";
import { useMeetingStorage } from "@/hooks/useMeetingStorage";

export function StatsView() {
    const { meeting } = useMeetingStorage();
    const endedMeeting = meeting.load()


    if (!endedMeeting) {
        return (
            <p> ... </p>
        )
    }

    return(
        <div>
            <h1 id="stats_heading" className="primary">{StatsText.heading}</h1>

            <div className="stats-container">

                <div className="chart-container">
                </div>
                <TextStats meeting={endedMeeting}/>
            </div>

            {/*<div id="stats-actions">*/}
            {/*    <button id="export-pdf-btn" className="tertiary"></button>*/}
            {/*    <button id="back-to-start">Start</button>*/}
            {/*</div>*/}

        </div>
    )
}