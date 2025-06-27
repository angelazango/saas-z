'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const SalesChart = ({ salesData }) => {
  // Filter out invalid dates
  const validSales = salesData.filter(sale => 
    sale.date && !isNaN(new Date(sale.date).getTime())
  );

  const chartData = {
    labels: validSales.map(sale => sale.date),
    datasets: [
      {
        label: 'Sales Amount',
        data: validSales.map(sale => sale.amount),
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM d, yyyy',
          displayFormats: {
            day: 'MMM d'
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `$${value.toLocaleString()}`
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `$${context.parsed.y.toLocaleString()}`;
          },
          title: (context) => {
            return new Date(context[0].label).toLocaleDateString();
          }
        }
      }
    }
  };

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Sales Trend</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesChart;

