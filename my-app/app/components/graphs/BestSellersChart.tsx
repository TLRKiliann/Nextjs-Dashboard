"use client";

import type { ProductsProps } from '@/app/lib/definitions';
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

const BestSellersChart: React.FC<{products: ProductsProps[]}> = ({products}): JSX.Element => {

  // Sort products by stock in descending order
  const sortedProducts = products.sort((a, b) => b.quantity - a.quantity);

  // Extract labels and dataset values from sorted products
  const labels = sortedProducts.map((product: ProductsProps) => product.name);
  const datasetValues = sortedProducts.map((product: ProductsProps) => product.quantity);

  const data = {
    labels,
    datasets: [
      {
        label: 'Sales',
        data: datasetValues,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 rounded-lg">
            <Bar options={options} data={data} className="w-auto h-[100%] pb-4 rounded-lg" />
        </div>
    );
}
export default BestSellersChart;
