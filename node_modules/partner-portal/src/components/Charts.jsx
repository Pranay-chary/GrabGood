import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const LineChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label || 'Revenue',
        data: data.values,
        fill: false,
        borderColor: '#2ecc71',
        tension: 0.1,
      },
    ],
  };

  return <Line options={options} data={chartData} />;
};

export const BarChart = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: data.label || 'Orders',
        data: data.values,
        backgroundColor: '#2ecc71',
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
};
