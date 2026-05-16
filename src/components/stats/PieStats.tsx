"use client"
import { Pie } from 'react-chartjs-2';
import { H1, H2, H3, H4 } from "@/components/ui/Headings";
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
        <div className={`w-full flex flex-col gap-8 mx-auto`}>
            <div className={`w-full flex flex-col items-center`}>
                <PieBakery label={ StatsText.participantPie } labels={ labels } dataArray={ participantData } />
            </div>
            <div className={`w-full flex flex-col items-center`}>
                <PieBakery label={ StatsText.speakingtimePie } labels={ labels } dataArray={ speakingData } />
            </div>
            <div className={`w-full flex flex-col items-center`}>
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

    function getCssVariable(variable: string): string {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();
    }

    const data = {
        labels: labels,
        datasets: [{
            label: label,
            data: dataArray,
            backgroundColor: [
                getCssVariable('--color-women-dark'),
                getCssVariable('--color-nonbinary-dark'),
                getCssVariable('--color-men-dark'),
            ],
            borderColor: [
                getCssVariable('--color-background-dark'),
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    font: {
                        size: 15,
                        weight: 'normal' as const,
                    },
                    color: getCssVariable('--color-foreground-dark'),
                    boxWidth: 15,
                    padding: 8
                }
            }
        }
    };

    return (
        <div className={`flex flex-col items-center`} >
            <H4>{label}</H4>
            <div className={`w-full`}>
                <Pie data={data} options={options} />
            </div>
        </div>
    )
}