


export default function MeetingPage() {
    // <div id="meeting-screen" className="screen" style="display: none;">
    return (
        <div>
            <h1 id="meeting-title" className="primary">Meeting name</h1>

            <div id="meeting-controls-container">

                <div id="tool-buttons">
                    <button id="timer-popup-btn" className="pop-out-btn">Pop Out Timer</button>
                    <button id="how-to-use-timer-btn" className="secondary">How to use</button>
                </div>

                <div id="timer-display" className="primary">00:00</div>

                <div className="speaker-buttons">
                    <button id="women-speaking" className="speaker-btn women">Woman</button>
                    <button id="nonbinary-speaking" className="speaker-btn nonbinary">Non-binary</button>
                    <button id="men-speaking" className="speaker-btn men">Man</button>
                </div>

                <div className="control-buttons">
                    <button id="pause-meeting" className="secondary">Paus</button>
                    <button id="end-meeting" className="secondary">Avsluta möte</button>
                </div>

            </div>

        </div>
    )
}