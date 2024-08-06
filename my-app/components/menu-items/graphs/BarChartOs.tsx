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
  indexAxis: 'x' as const,
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
      text: 'Platform OS',
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

const BarChart:React.FC<{linux: number; mac: number; windows: number;}> = ({linux, mac, windows}) => {
    
  const osNames = ["Linux", "Mac", "Windows"];
  const operationSystem = [linux, mac, windows];

  const data = {
    labels: osNames,
    datasets: [
      {
        label: 'Men',
        data: operationSystem,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };  

  return (
    <div className="flex flex-col items-center justify-center w-[95%] h-full">
        <h2 className="text-base font-serif text-slate-500 -mt-8 mb-2">Platform OS</h2>
        <Bar options={options} data={data} className="w-full h-full px-2 -mb-10" />
    </div>
  );
}
export default BarChart;
