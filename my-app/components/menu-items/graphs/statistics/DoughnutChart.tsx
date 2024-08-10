"use client";

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right' as const,
            labels: {
                color: 'rgba(100, 116, 139, 1)',
            }
        },
        title: {
            display: false,
            text: 'Doughnut Chart',
        },
        tooltips: {
            callbacks: {
                title: function(tooltipItem: any, data: any) {
                  return data['labels'][tooltipItem[0]['index']];
                },
                label: function(tooltipItem: any, data: any) {
                  return data['datasets'][0]['data'][tooltipItem['index']];
                },
            },
            /* backgroundColor: '#000',
            titleFontSize: 16,
            titleFontColor: 'rgba(100, 116, 139, 1)',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: true */
        }
    },
};

const data = {
    labels: ['Unsatisfied', 'View', 'No Comment', 'Satisfied'],
    datasets: [
        {
            label: ' Nb of Votes',
            data: [16, 10, 12, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        }
    ],
};

const DoughnutChart = () => (
    <div className='flex flex-col items-center justify-center w-full h-[100%]'>
        <h2 className='text-base font-serif text-slate-500 mt-10'>Satisfaction</h2>
        <Doughnut options={options} data={data} className='w-auto h-[100%] -mt-10'/> 
    </div>
);
export default DoughnutChart;
