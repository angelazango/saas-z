'use client';
import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { format, parse } from 'date-fns';

export default function PurchaseTrendChart() {
  const { purchases } = useSelector((state) => state.purchase);
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (purchases.length > 0) {
      processChartData();
    }
  }, [purchases, timeRange]);

  const processChartData = () => {
    // Group purchases by date and calculate daily totals
    const dailyData = purchases.reduce((acc, purchase) => {
      // Parse the date from backend format (dd-MM-yyyy)
      const parsedDate = parse(purchase.purchase_date, 'dd-MM-yyyy', new Date());
      const dateKey = format(parsedDate, 'yyyy-MM-dd');
      
      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dateKey,
          total: 0,
          count: 0
        };
      }
      
      acc[dateKey].total += purchase.total_price || 0;
      acc[dateKey].count += 1;
      
      return acc;
    }, {});

    // Convert to array and sort by date
    let data = Object.values(dailyData).sort((a, b) => new Date(a.date) - new Date(b.date));

    // Apply time range filter
    if (timeRange !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();

      if (timeRange === 'week') {
        cutoffDate.setDate(now.getDate() - 7);
      } else if (timeRange === 'month') {
        cutoffDate.setMonth(now.getMonth() - 1);
      } else if (timeRange === 'year') {
        cutoffDate.setFullYear(now.getFullYear() - 1);
      }

      data = data.filter(item => new Date(item.date) >= cutoffDate);
    }

    // Format dates for display
    const formattedData = data.map(item => ({
      ...item,
      displayDate: format(new Date(item.date), 'MMM dd'),
      total: Math.round(item.total) // Ensure we have whole numbers
    }));

    setChartData(formattedData);
  };

  // Calculate stats for the footer
  const totalValue = chartData.reduce((sum, item) => sum + item.total, 0);
  const totalPurchases = chartData.reduce((sum, item) => sum + item.count, 0);
  const avgDaily = chartData.length > 0 ? Math.round(totalValue / chartData.length) : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 
        to-slate-900 px-6 py-5 rounded-xl shadow-2xl border border-emerald-200/30 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r 
            from-emerald-400 to-emerald-500"></div>
            <p className="text-emerald-100 font-medium text-sm">
              {format(new Date(payload[0].payload.date), 'MMMM d, yyyy')}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-emerald-300 font-bold text-lg">
              {payload[0].value.toLocaleString()} XAF
            </p>
            <p className="text-emerald-200/80 text-sm">
              {payload[0].payload.count} purchase{payload[0].payload.count !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-xs text-emerald-200/60 mt-2 border-t border-emerald-300/20 pt-2">
            Daily Purchase Volume
          </div>
        </div>
      );
    }
    return null;
  };

  const timeRangeButtons = [
    { key: 'week', label: 'Week', icon: '📅' },
    { key: 'month', label: 'Month', icon: '📊' },
    { key: 'year', label: 'Year', icon: '📈' },
    { key: 'all', label: 'All Time', icon: '🌍' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-100 rounded-2xl shadow-2xl border border-slate-200/50 mt-6 overflow-hidden">
      {/* Elegant background pattern */}
      
      {/* Header Section */}
      <div className="relative px-8 pt-8 pb-4">
        <div className="flex flex-col lg:flex-row  lg:justify-between gap-6">
          {/* Title Section */}
          <div className="flex gap-3">
            <div className="w-1 h-10 rounded-full shadow-lg"></div>
            <div>
              <h2 className="text-2xl  bg-gradient-to-r
               from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Purchase Trend 
              </h2>
            
            </div>
           
          </div>

          {/* Time Range Buttons */}
          
        </div>
      </div>

      {/* Chart Content */}
      <div className="relative px-8 pb-8">
        {chartData.length > 0 ? (
          <div className="space-y-6">
            {/* Chart Container */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6
             border border-slate-200/60 shadow-inner">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 35,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <defs>
                      <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10b881" stopOpacity={0.8} />
                        <stop offset="50%" stopColor="#34d399" stopOpacity={0.4} />
                        <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.1} />
                      </linearGradient>
                      <linearGradient id="strokeGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#059669" />
                        <stop offset="50%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#34d399" />
                      </linearGradient>
                    </defs>

                    <CartesianGrid 
                      strokeDasharray="2 4" 
                      vertical={false} 
                      stroke="#e2e8f0" 
                      strokeOpacity={0.6}
                    />
                    
                    <XAxis 
                      dataKey="displayDate" 
                      tick={{ 
                        fontSize: 13, 
                        fill: '#475569',
                        fontWeight: 500
                      }}
                      tickMargin={15}
                      axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                      tickLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                    />
                    
                    <YAxis 
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                      tick={{ 
                        fontSize: 13, 
                        fill: '#475569',
                        fontWeight: 500
                      }}
                      width={80}
                      axisLine={{ stroke: '#cbd5e1', strokeWidth: 2 }}
                      tickLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                      tickMargin={10}
                      label={{ 
                        value: 'Amount (XAF)', 
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
                        stroke: 'rgba(160, 185, 16, 0.3)',
                        strokeWidth: 2,
                        strokeDasharray: '4 4'
                      }}
                    />
                    
                    <Area
                      type="monotone"
                      dataKey="total"
                      stroke="url(#strokeGradient)"
                      strokeWidth={3}
                      fill="url(#areaGradient)"
                      dot={{ 
                        fill: '#059669', 
                        strokeWidth: 3, 
                        stroke: '#fff',
                        r: 5
                      }}
                      activeDot={{ 
                        r: 7, 
                        fill: '#10b981',
                        stroke: '#fff',
                        strokeWidth: 3,
                        filter: 'drop-shadow(0 4px 6px rgba(16, 185, 129, 0.3))'
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Stats Footer */}
            <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
              
              
              
              
      
            </div>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-16 border border-slate-200/60
           shadow-inner text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-slate-200 
            to-slate-300 rounded-full flex items-center justify-center">
              <div className="text-2xl opacity-50">📊</div>
            </div>
            <h3 className="text-xl font-semibold text-slate-700 mb-3">
              {purchases.length === 0 ? 'No Purchase Data Available' : 'No Data for Selected Period'}
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {purchases.length === 0 
                ? 'Purchase analytics will appear here once transactions are recorded in the system.'
                : 'Try selecting a different time range or check if there are purchases in the selected period.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
}