"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Tooltip,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgba(100, 116, 139, 1)',
      }
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
  scales: {
    y: {
      grid: {
        drawBorder: true,
        color: 'rgba(120, 120, 120, 0.1)',
      },
      ticks: {
        beginAtZero: true,
        min: 0,
        color: 'rgba(100, 116, 139, 1)',
        stepSize: 100,
        font: {
          size: 12,
        },
      }
    },
    x: {
      grid: {
        drawBorder: true,
        color: 'rgba(120, 120, 120, 0.1)',
      },
      ticks: {
        beginAtZero: false,
        color: 'rgba(100, 116, 139, 1)',
        font: {
          size: 12,
        },
      }
    },
  },
};

const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const dataset1Values = [100, 260, 200, 350, 200, 100];
const dataset2Values = [220, 100, 350, 180, 200, 20];

const data = {
  labels,
  datasets: [
    {
      label: 'Girls',
      data: dataset1Values,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      borderWidth: 2,
    },
    {
      label: 'Men',
      data: dataset2Values,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      borderWidth: 2,
    },
  ],
};

const LineChart = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100%] h-[70%] text-slate-500">
      <h2 className="text-base -mt-8 mb-2">Daily Traffic</h2>
      <Line options={options} data={data} className="w-[100%] h-[70%] -mb-10 m-2" />
    </div>
  );
};

export default LineChart;
