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
        color: 'rgba(255, 255, 255, 0.8)',
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
        color: 'rgba(255, 255, 255, 0.2)',
      },
      ticks: {
        stepSize: 1,
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(255, 255, 255, 0.2)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.8)',
        font: {
          size: 12,
        },
      },
    },
  },
};

const QuantityByUsers: React.FC<{productsQuantityByUser: { [key: string]: number }}> = ({productsQuantityByUser}): JSX.Element => {

    //const labels = Object.keys(productsQuantityByUser);
    //const quantity = Object.values(productsQuantityByUser);

    const productsQuantityArray = Object.entries(productsQuantityByUser);

    productsQuantityArray.sort((a, b) => b[1] - a[1]);
    
    const users = productsQuantityArray.slice(0, 8).map(([userName, totalQuantity]) => userName);
    const quantity = productsQuantityArray.slice(0, 8).map(([userName, totalQuantity]) => totalQuantity);

    const data = {
        labels: users,
        datasets: [
          {
            label: 'Quantity/User',
            data: quantity,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          }
        ],
      };

    return (
        <div className="flex flex-col items-center justify-center w-[95%] h-full">
            <h2 className="text-base font-serif text-slate-100 -mt-8 mb-2">Quantity By User</h2>
            <Bar options={options} data={data} className="w-full h-full px-2 -mb-10" />
        </div>
    );
}
export default QuantityByUsers;