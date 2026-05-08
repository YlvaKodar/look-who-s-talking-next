
export default function StatisticsPage() {
    // <div id="stats-screen" className="screen" style="display: none;">
    return (
        <div>
            <h1 id="stats_heading" className="primary">Meeting statistics</h1>

            <div className="stats-container">
                <div className="chart-container">

                    <h3 id="participants-chart-title" className="tertiary"></h3>
                    <canvas id="participants-chart"></canvas>

                    <h3 id="speaking-time-chart-title" className="tertiary"></h3>
                    <canvas id="speaking-time-chart"></canvas>

                    <h3 id="interventions-chart-title" className="tertiary"></h3>
                    <canvas id="interventions-chart"></canvas>

                </div>

                <div className="text-stats">
                    <h3 className="tertiary">Total speaking time: <span id="total-time">00:00</span> minutes</h3>
                    <h3 id="participant-count" className="tertiary">Participant count: </h3>
                    <div id="gender-stats"></div>

                </div>
            </div>
            <div id="stats-actions">
                <button id="export-pdf-btn" className="tertiary"></button>
                <button id="back-to-start">Start</button>
            </div>
        </div>
    )
}