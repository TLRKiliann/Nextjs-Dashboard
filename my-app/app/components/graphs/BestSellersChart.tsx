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
    },
    title: {
      display: false,
      text: 'Best Sellers',
    },
  },
};

const labels = ['CPU', 'Keyboard', 'SSD', 'Ventirad', 'RAM'];

const datasetValues = [28, 22, 18, 12, 3];

export const data = {
  labels,
  datasets: [
    {
      label: 'Sales in %',
      data: datasetValues,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const BarChart = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 rounded-lg">
            <h2 className="text-base -mt-4 mb-8">Best Sellers (last month)</h2>
            <Bar options={options} data={data} className="w-auto h-[100%] px-2 -mb-10 rounded-lg" />
        </div>
    );
}
export default BarChart;