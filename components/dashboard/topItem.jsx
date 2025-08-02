
'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe'];

// 🧰 Dummy hardware store top-selling products
const dummySalesData = [
  { productName: 'Bosch Drill 18V', sales: 120 },
  { productName: 'Stainless Steel Screws 4x40mm', sales: 95 },
  { productName: 'PVC Basin Tap', sales: 80 },
  { productName: 'Cable 2.5mm²', sales: 72 },
  { productName: '40mm Padlock', sales: 65 },
];

export default function TopSellingProductsPieChart() {
  // Convert to chart-friendly format
  const chartData = dummySalesData.map(({ productName, sales }) => ({
    name: productName,
    value: sales,
  }));

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Top Selling Products
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`slice-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} sales`} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
