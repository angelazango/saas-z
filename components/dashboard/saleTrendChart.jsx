'use client';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  BarChart,
  Bar,
  Dot
} from 'recharts';
import { format } from 'date-fns';

export default function SalesTrendChart() {
  const sales = useSelector((state) => state.sale.sales || []);

  const data = useMemo(() => {
    const map = {};

    sales.forEach((sale) => {
      const formattedDate = sale.Sale_date?.split('-').reverse().join('-') || 'N/A'; // DD-MM-YYYY to YYYY-MM-DD
      const dateKey = format(new Date(formattedDate), 'MMM dd'); // "Jul 02"

      if (!map[dateKey]) {
        map[dateKey] = {
          date: dateKey,
          total: 0,
          quantity: 0,
        };
      }

      map[dateKey].total += sale.unit_price * sale.quantity;
      map[dateKey].quantity += sale.quantity;
    });

    return Object.values(map).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [sales]);

  return (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Trend</h3>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#3B82F6" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#3B82F6"
            fill="url(#salesGradient)"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
