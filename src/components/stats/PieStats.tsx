"use client"
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Gender, MeetingStats} from '@/types/meeting';

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartStatsProps = {
    meetingStats: MeetingStats;
    presentGenders: Gender[];
}

export function PieStats({ meetingStats, presentGenders }: ChartStatsProps) {
    const data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
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
        <div>
            <Pie data={data} />
        </div>
    )
}