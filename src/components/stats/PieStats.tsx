"use client"
import { Pie } from 'react-chartjs-2';
import { H4 } from "@/components/ui/Headings";
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
                <PieBakery label={ StatsText.participantPie } labels={ labels } dataArray={ participantData } presentGenders={presentGenders} />
            </div>
            <div className={`w-full flex flex-col items-center`}>
                <PieBakery label={ StatsText.speakingtimePie } labels={ labels } dataArray={ speakingData } presentGenders={presentGenders}  />
            </div>
            <div className={`w-full flex flex-col items-center`}>
                <PieBakery label={ StatsText.statementPie } labels={ labels } dataArray={ statementData } presentGenders={presentGenders}  />
            </div>
        </div>
    )
}

type PieIngredients = {
    label: string;
    labels: string[];
    dataArray: number[];
    presentGenders: Gender[];
}

function PieBakery({label, labels, dataArray, presentGenders}: PieIngredients) {

    function getCssVariable(variable: string): string {
        return getComputedStyle(document.documentElement)
            .getPropertyValue(variable)
            .trim();
    }

    const backgroundColors = presentGenders.map(gender =>
        getCssVariable(Genders.chartColors[gender])
    );

    const data = {
        labels: labels,
        datasets: [{
            label: label,
            data: dataArray,
            backgroundColor: backgroundColors,
            borderColor: [
                getCssVariable('--color-bgdark'),
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