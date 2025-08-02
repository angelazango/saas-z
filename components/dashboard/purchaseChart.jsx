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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-bold">{format(new Date(payload[0].payload.date), 'MMMM d, yyyy')}</p>
          <p className="text-blue-600">Total: {payload[0].value.toLocaleString()} XAF</p>
          <p className="text-gray-600">Purchases: {payload[0].payload.count}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium">Purchase Trends</CardTitle>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('week')}
            className={`px-3 py-1 text-sm rounded ${timeRange === 'week' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-3 py-1 text-sm rounded ${timeRange === 'month' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange('year')}
            className={`px-3 py-1 text-sm rounded ${timeRange === 'year' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
          >
            Year
          </button>
          <button
            onClick={() => setTimeRange('all')}
            className={`px-3 py-1 text-sm rounded ${timeRange === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100'}`}
          >
            All
          </button>
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        {chartData.length > 0 ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="displayDate" 
                  tick={{ fontSize: 12 }}
                  tickMargin={10}
                />
                <YAxis 
                  tickFormatter={(value) => `${value.toLocaleString()} XAF`}
                  tick={{ fontSize: 12 }}
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6"
                  fill="#93c5fd"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-[400px] flex items-center justify-center text-gray-500">
            {purchases.length === 0 ? 'No purchase data available' : 'No data for selected time range'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}