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
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
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
    },
    {
      label: 'Men',
      data: dataset2Values,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const LineChart = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full text-slate-300 rounded-lg">
      <h2 className="text-base -mt-8 mb-2">Daily Traffic</h2>
      <Line options={options} data={data} className="w-full h-full px-2 -mb-10 rounded-lg" />
    </div>
  );
};

export default LineChart;
