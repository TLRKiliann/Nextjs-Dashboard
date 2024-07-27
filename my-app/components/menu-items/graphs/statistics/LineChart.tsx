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
        max: 50,
        color: 'rgba(100, 116, 139, 1)',
        stepSize: 5,
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

const LineChart: React.FC<{dataForChart: {date: string, connections: number}[]}> = ({dataForChart}) => {

  const dataDate = dataForChart.map((date) => date.date);
  const connections = dataForChart.map((conn) => conn.connections);

  const data = {
    labels: dataDate,
    datasets: [
      {
        label: 'Connections/Day',
        data: connections,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center w-[100%] h-[70%] text-slate-500">
      <h2 className="text-base font-serif text-slate-600/70 -mt-8 mb-2">Daily Traffic</h2>
      <Line options={options} data={data} className="w-[100%] h-[70%] -mb-10 m-2" />
    </div>
  );
};

export default LineChart;
