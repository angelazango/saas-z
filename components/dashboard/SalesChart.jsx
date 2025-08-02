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
import { format, parse } from 'date-fns';

export default function SalesChart() {
  const { sales = [] } = useSelector((state) => state.sale || {});

  // Process sales data by date
  const dailySales = sales.reduce((acc, sale) => {
    if (!sale.Sale_date) return acc;
    
    try {
      // Parse date from DD-MM-YYYY format
      const [day, month, year] = sale.Sale_date.split('-');
      const date = new Date(`${year}-${month}-${day}`);
      
      if (isNaN(date.getTime())) return acc;
      
      const dateKey = format(date, 'MMM d');
      
      if (!acc[dateKey]) {
        acc[dateKey] = { date: dateKey, quantity: 0 };
      }
      
      acc[dateKey].quantity += sale.quantity || 0;
    } catch (error) {
      console.error('Error processing sale date:', error);
    }
    
    return acc;
  }, {});

  // Convert to array and sort by date
  const data = Object.values(dailySales).sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-gray-900 px-4 py-3 rounded-md shadow-md border border-white/20">
          <p className="text-white font-medium text-sm mb-1">{label}</p>
          <p className="text-blue-300 font-semibold">
            {`${payload[0].value} items sold`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative bg-white p-6 rounded-xl shadow-md w-full border border-slate-200 mb-6">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Daily Sales Quantity</h2>
        <p className="text-sm text-slate-500">Items sold per day</p>
      </div>
      
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="date"
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis 
              tick={{ fill: '#64748b', fontSize: 12 }}
              label={{ value: 'Quantity', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="quantity" fill="#3b82f6" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill="#3b82f6" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No sales data available for the chart
        </div>
      )}
    </div>
  );
}