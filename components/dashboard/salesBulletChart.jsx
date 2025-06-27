'use client';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function SalesBulletChart() {
  const { sales } = useSelector((state) => state.sale);

  const target = 100000; // You can replace this with a dynamic value later

  // 1. Group sales by date
  const salesByDate = {};

  sales.forEach((sale) => {
    const date = sale.Sale_date || 'N/A';
    const amount = sale.unit_price * sale.quantity;

    if (!salesByDate[date]) {
      salesByDate[date] = amount;
    } else {
      salesByDate[date] += amount;
    }
  });

  // 2. Format data for recharts
  const chartData = Object.entries(salesByDate).map(([date, total]) => ({
    date,
    revenue: total,
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto mt-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">📊 Sales vs Target</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            formatter={(value) => `${value.toLocaleString()} XAF`}
            labelFormatter={(label) => `Date: ${label}`}
          />
          {/* Actual sales */}
          <Bar dataKey="revenue" fill="#60A5FA" barSize={30} />

          {/* Target line for each bar */}
          {chartData.map((entry, index) => (
            <ReferenceLine
              key={index}
              y={target}
              stroke="#EF4444"
              strokeDasharray="3 3"
              label={index === 0 ? { value: 'Target', position: 'top', fill: '#EF4444' } : null}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
