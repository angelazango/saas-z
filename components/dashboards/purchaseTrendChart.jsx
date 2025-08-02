'use client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function PurchaseTrendChart() {
  const purchases = useSelector((state) => state.purchase?.purchases || []);

  // Group purchases by date, sum quantity or spend
  const data = useMemo(() => {
    const grouped = {};

    purchases.forEach(({ purchase_date, quantity, price }) => {
      if (!purchase_date) return;
      if (!grouped[purchase_date]) grouped[purchase_date] = { date: purchase_date, quantity: 0, spend: 0 };
      grouped[purchase_date].quantity += quantity || 0;
      grouped[purchase_date].spend += (price || 0) * (quantity || 0);
    });

    // Convert to array and sort by date ascending
    return Object.values(grouped).sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [purchases]);

  const formatValue = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white h-[402px]  border border-gray-200 rounded-xl shadow-sm">
      {/* Header Section */}
      <div className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg p-1 font-semibold text-gray-900 ">
              Purchase Trend
            </h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              
            </div>
            <div className="w-px h-1 bg-gray-200"></div>
            <div className="text-right">
             
             
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-8">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={360}>
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="2 4" 
                stroke="#e5e7eb"
                strokeOpacity={0.3}
                horizontal={true}
                vertical={false}
              />
              <XAxis 
                dataKey="date"
                tick={{ 
                  fontSize: 11, 
                  fill: '#9ca3af',
                  fontWeight: 400
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatDate}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ 
                  fontSize: 11, 
                  fill: '#9ca3af',
                  fontWeight: 400
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatValue}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  padding: '16px 20px',
                  fontSize: '13px',
                  fontWeight: '500',
                  backdropFilter: 'blur(10px)'
                }}
                labelStyle={{
                  color: '#1f2937',
                  fontWeight: '600',
                  marginBottom: '8px',
                  fontSize: '14px'
                }}
                formatter={(value, name) => [
                  formatValue(value),
                  name === 'quantity' ? 'Quantity' : name
                ]}
                labelFormatter={(label) => `${formatDate(label)}`}
                cursor={false}
              />
              <Area 
                type="monotone"
                dataKey="quantity" 
                stroke="#8b5cf6"
                strokeWidth={3}
                fill="url(#colorGradient)"
                dot={{ 
                  fill: '#8b5cf6', 
                  strokeWidth: 2, 
                  stroke: '#ffffff',
                  r: 4,
                  strokeOpacity: 1
                }}
                activeDot={{ 
                  r: 6, 
                  fill: '#8b5cf6',
                  stroke: '#ffffff',
                  strokeWidth: 3,
                  style: { filter: 'drop-shadow(0 4px 6px rgba(139, 92, 246, 0.3))' }
                }}
              />
              {/* Secondary trend line with lower opacity */}
              <Line 
                type="monotone"
                dataKey="spend" 
                stroke="#6366f1"
                strokeWidth={2}
                strokeDasharray="5 5"
                strokeOpacity={0.4}
                dot={false}
                activeDot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">No Purchase Data</h4>
            <p className="text-sm text-gray-500 max-w-sm">
              There are no purchase records available to display in the chart. 
              Start adding purchases to see trend analysis.
            </p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      
    </div>
  );
}