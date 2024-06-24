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
    },
    title: {
      display: false,
      text: 'Platform OS',
    },
  },
};

const labels = ['HDD', 'Keyboard', 'SSD', 'Ventirad', 'RAM'];

const datasetValues = [28, 22, 18, 12, 3];

export const data = {
  labels,
  datasets: [
    {
      label: 'Products',
      data: datasetValues,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const BarChart = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 rounded-lg shadow-out">
            <h2 className="text-base -mt-8 mb-2">Best Sellers</h2>
            <Bar options={options} data={data} className="w-full h-full px-2 -mb-10 rounded-lg" />
        </div>
    );
}
export default BarChart;