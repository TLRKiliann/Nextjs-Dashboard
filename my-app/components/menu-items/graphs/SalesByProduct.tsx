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
        color: 'rgba(120, 120, 120, 0.1)',
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
        color: 'rgba(120, 120, 120, 0.1)',
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

const SalesByProduct: React.FC<{productsTotalPriceByName: { [key: string]: number }}> = ({productsTotalPriceByName}): JSX.Element => {

    const productsQuantityArray = Object.entries(productsTotalPriceByName);

    productsQuantityArray.sort((a, b) => b[1] - a[1]);
    
    const products = productsQuantityArray.map(([name, totalQuantity]) => name);
    const quantity = productsQuantityArray.map(([userName, totalQuantity]) => totalQuantity);

    const data = {
        labels: products,
        datasets: [
          /* {
            label: 'Girls',
            data: dataset1Values,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }, */
          {
            label: 'Product/Total Price',
            data: quantity,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <h2 className="text-base font-serif text-slate-600/70 -mt-8 mb-2">Sales By Product</h2>
            <Bar options={options} data={data} className="w-full h-full px-2 -mb-10" />
        </div>
    );
}
export default SalesByProduct;