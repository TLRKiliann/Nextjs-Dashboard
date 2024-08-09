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
        setpSize: 100,
        font: {
          size: 12,
        },
      },
    },
  },
};

const TotalSalesByProduct: React.FC<{productsTotalPriceByName: { [key: string]: number }}> = ({productsTotalPriceByName}): JSX.Element => {

    const productsQuantityArray = Object.entries(productsTotalPriceByName);

    productsQuantityArray.sort((a, b) => b[1] - a[1]);
    
    const products = productsQuantityArray.map(([name, totalQuantity]) => name);
    const quantity = productsQuantityArray.map(([userName, totalQuantity]) => totalQuantity);

    const data = {
      labels: products,
      datasets: [
        {
          label: 'Total Sales by Product',
          data: quantity,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
            <h2 className="text-base font-serif text-slate-100 -mt-10 mb-8">Total Sales by Product</h2>
            <Bar options={options} data={data} className="w-full h-full px-2 -mb-16" />
        </div>
    );
}
export default TotalSalesByProduct;