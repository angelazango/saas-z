// components/SalesTrendChart.jsx
'use client';

import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function SalesTrendChart() {
  const sales = useSelector((state) => state.sale.sales);

  // Calculate total revenue and assume a target for percentage
  const chartData = useMemo(() => {
    let totalRevenue = 0;
    sales.forEach((sale) => {
      totalRevenue += sale.quantity * sale.selling_price;
    });

    const target = 10000000; // Example target (10 million XAF)
    const percent = Math.min((totalRevenue / target) * 100, 100).toFixed(0);

    return {
      labels: ['Achieved', 'Remaining'],
      datasets: [
        {
          data: [percent, 100 - percent],
          backgroundColor: ['#8B5CF6', '#E5E7EB'], // Purple & light gray
          borderWidth: 0,
          cutout: '70%',
        },
      ],
    };
  }, [sales]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}%`
        }
      },
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="bg-white/90 shadow-md rounded-xl p-6 h-[400px]  flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold mb-2">Sales Target</h3>
      <p className="text-gray-500 text-sm mb-4">Progress Toward Goal</p>
      <div className="relative h-[250px] w-[250px]">
        <Doughnut data={chartData} options={options} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-purple-600">
          {chartData.datasets[0].data[0]}%
        </div>
      </div>
    </div>
  );
}
