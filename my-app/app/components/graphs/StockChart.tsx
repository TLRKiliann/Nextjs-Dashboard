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
      text: 'Stock',
    },
  },
};

const labels = ['RAM', 'Ventirad', 'SSD', 'Keyboard', 'CPU'];

const datasetValues = [99, 85, 58, 22, 8];

export const data = {
  labels,
  datasets: [
    {
      label: 'Stock of Products',
      data: datasetValues,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

const StockChart = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 rounded-lg">
            <Bar options={options} data={data} className="w-auto h-[100%] pb-4 rounded-lg" />
        </div>
    );
}
export default StockChart;