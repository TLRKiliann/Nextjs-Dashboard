"use client";

import type { Product } from '@prisma/client';
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

const StockChart: React.FC<{products: Product[]}> = ({products}): JSX.Element => {

  // Sort products by stock in descending order
  const sortedProducts = products.sort((a, b) => b.stock - a.stock);

  // Extract labels and dataset values from sorted products
  const labels = sortedProducts.map((product: Product) => product.name);
  const datasetValues = sortedProducts.map((product: Product) => product.stock);

  const data = {
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

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50 rounded-lg">
            <Bar options={options} data={data} className="w-auto h-[100%] pb-4 rounded-lg" />
        </div>
    );
}
export default StockChart;