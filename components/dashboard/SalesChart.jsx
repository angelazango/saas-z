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

  // Calculate max value for gradient intensity
  const maxValue = Math.max(...data.map(item => item.quantity));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-5 py-4 rounded-lg shadow-2xl border border-amber-200/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500"></div>
            <p className="text-amber-100 font-medium text-sm">{label}</p>
          </div>
          <p className="text-amber-300 font-bold text-lg">
            {`${payload[0].value} items`}
          </p>
          <div className="text-xs text-amber-200/70 mt-1">Daily Sales Volume</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 rounded-2xl shadow-2xl w-full border border-slate-200/50 mb-6 overflow-hidden">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 to-slate-50/30 rounded-2xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-100/20 to-transparent rounded-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-slate-100/30 to-transparent rounded-2xl"></div>
      
      {/* Header section */}
      <div className="relative mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full shadow-lg"></div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            Daily Sales Analytics
          </h2>
        </div>
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
      </div>
      
      {data.length > 0 ? (
        <div className="relative">
          {/* Chart container with elegant border */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-slate-200/60 shadow-inner">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart 
                data={data} 
                margin={{ top: 25, right: 35, left: 25, bottom: 25 }}
                barCategoryGap="12%"
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="50%" stopColor="#d97706" stopOpacity={0.8} />
                    <stop offset="100%" stopColor="#92400e" stopOpacity={0.9} />
                  </linearGradient>
                  <linearGradient id="barGradientHover" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity={1} />
                    <stop offset="50%" stopColor="#f59e0b" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#d97706" stopOpacity={1} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="2 4" 
                  stroke="#e2e8f0" 
                  strokeOpacity={0.6}
                  vertical={false}
                />
                
                <XAxis 
                  dataKey="date"
                  tick={{ 
                    fill: '#475569', 
                    fontSize: 13,
                    fontWeight: 500
                  }}
                  axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                  tickLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                  tickMargin={12}
                />
                
                <YAxis 
                  tick={{ 
                    fill: '#475569', 
                    fontSize: 13,
                    fontWeight: 500
                  }}
                  axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                  tickLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                  tickMargin={10}
                  label={{ 
                    value: 'Items Sold', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { 
                      textAnchor: 'middle',
                      fill: '#64748b',
                      fontWeight: 600,
                      fontSize: '14px'
                    }
                  }}
                />
                
                <Tooltip 
                  content={<CustomTooltip />}
                  cursor={{ 
                    fill: 'rgba(251, 191, 36, 0.1)',
                    stroke: 'rgba(245, 158, 11, 0.3)',
                    strokeWidth: 2
                  }}
                />
                
                <Bar 
                  dataKey="quantity" 
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  stroke="rgba(217, 119, 6, 0.3)"
                  strokeWidth={1}
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill="url(#barGradient)"
                      className="hover:fill-[url(#barGradientHover)] transition-all duration-300 drop-shadow-lg"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Elegant stats footer */}
          <div className="flex justify-between items-center mt-6 px-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500"></div>
                <span className="text-sm font-medium text-slate-600">Total Data Points: {data.length}</span>
              </div>
              <div className="w-px h-4 bg-slate-300"></div>
              <div className="text-sm font-medium text-slate-600">
                Peak Sales: {maxValue} items
              </div>
            </div>
            <div className="text-xs text-slate-500 italic">
              Real-time analytics dashboard
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-12 border border-slate-200/60 shadow-inner text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded opacity-50"></div>
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">No Data Available</h3>
            <p className="text-slate-500">Sales data will appear here once transactions are recorded</p>
          </div>
        </div>
      )}
    </div>
  );
}