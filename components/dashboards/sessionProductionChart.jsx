'use client';

import { useSelector } from 'react-redux';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import { format, isValid } from 'date-fns';

export default function SessionProductionChart() {
  const { sessionProducts = [] } = useSelector((state) => state.sessionProduct || {});

  // Aggregate quantity by formatted date
  const groupedData = sessionProducts.reduce((acc, record) => {
    const date = record?.production_date;
    if (!date) return acc;

    const parsedDate = new Date(date);
    if (!isValid(parsedDate)) return acc;

    const formattedDate = format(parsedDate, 'MMM d');
    acc[formattedDate] = (acc[formattedDate] || 0) + (record?.quantity || 0);
    return acc;
  }, {});

  const data = Object.entries(groupedData).map(([date, quantity]) => ({ date, quantity }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-gray-900 px-4 py-3 rounded-md shadow-md border border-white/20">
          <p className="text-white font-medium text-sm mb-1">{label}</p>
          <p className="text-blue-300 font-semibold">
            {`${payload[0].value} units produced`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative bg-white p-8 rounded-xl shadow-md w-full border border-slate-200 overflow-hidden">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Daily Production Overview</h2>
        <div className="mt-1 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-sm text-slate-500">Updated summary</span>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <filter id="barShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.1)" />
              </filter>

              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e40af" />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="rgba(100, 116, 139, 0.1)" strokeDasharray="4 4" />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#475569', fontSize: 12, fontWeight: 500 }}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="quantity" radius={[6, 6, 0, 0]} filter="url(#barShadow)">
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill="url(#blueGradient)" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-blue-400 rounded-full" />
          <span className="font-medium">Production Metrics</span>
        </div>
        <div className="flex items-center gap-1">
          <span>{data.length} data points</span>
          <div className="w-1 h-1 bg-slate-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}
