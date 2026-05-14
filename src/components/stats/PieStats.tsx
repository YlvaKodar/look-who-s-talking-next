"use client"
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Gender, MeetingStats} from '@/types/meeting';
import { Genders, StatsText } from "@/constants/constants";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartStatsProps = {
    meetingStats: MeetingStats;
    presentGenders: Gender[];
}

export function PieStats({ meetingStats, presentGenders }: ChartStatsProps) {

    const labels = presentGenders.map(gender => Genders.chartLabels[gender]);
    const participantData = presentGenders.map(gender =>  meetingStats.genderStats[gender].participating );
    const speakingData = presentGenders.map(gender =>  meetingStats.genderStats[gender].speakingTime );
    const statementData = presentGenders.map(gender =>  meetingStats.genderStats[gender].statementCount );


    return (
        <div>
            <div >
                <PieBakery label={ StatsText.participantPie } labels={ labels } dataArray={ participantData } />
            </div>
            <div >
                <PieBakery label={ StatsText.speakingtimePie } labels={ labels } dataArray={ speakingData } />
            </div>
            <div >
                <PieBakery label={ StatsText.statementPie } labels={ labels } dataArray={ statementData } />
            </div>
        </div>
    )
}

type PieIngredients = {
    label: string;
    labels: string[];
    dataArray: number[];
}
function PieBakery({label, labels, dataArray}: PieIngredients) {


    const data = {
        labels: labels,
        datasets: [{
            label: label,
            data: dataArray,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    const config = {
        type: 'pie',
        data: data,
    };


    return (
        <div style={{ width: '20%' }}>
            <h3>{label}</h3>
            <Pie data={data} />
        </div>
    )
}