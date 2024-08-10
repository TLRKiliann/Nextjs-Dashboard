"use client";

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y' as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgba(100, 116, 139, 1)',
      }
    },
    title: {
      display: false,
      text: 'Browsers',
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(100, 116, 139, 1)',
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
      },
      ticks: {
        color: 'rgba(100, 116, 139, 1)',
        font: {
          size: 12,
        },
      },
    },
  },
};

const BarChart:React.FC<{
  firefox: number; 
  google: number;
  edge: number;
  opera: number;
  ie: number; 
  safari: number; }> = ({firefox, google, safari, edge, opera, ie}) => {
  
  const browsersName = ["Firefox", "Google", "Safari", "Edge", "Opera", "IE"];
  const nbBrowsers = [firefox, google, safari, edge, opera, ie];

  const data = {
    labels: browsersName,
    datasets: [
      {
        label: 'Men',
        data: nbBrowsers,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-[95%] h-full">
      <h2 className="text-base font-serif text-slate-500 -mt-8 mb-2">Browsers</h2>
      <Bar options={options} data={data} className="w-full h-full px-2 -mb-10" />
    </div>
  );
}
export default BarChart;