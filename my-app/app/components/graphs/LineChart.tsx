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

const labels = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgb(255, 255, 255)",
      borderColor: "rgb(0, 255, 255)",
      data: [25, 38, 25, 33, 21, 31],
    },
  ],
};

const LineChart = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Line data={data} className="w-full h-full bg-slate-800 px-2 py-2 rounded-lg" />
    </div>
  );
};

export default LineChart;
