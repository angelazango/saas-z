// 'use client';
// import { useSelector } from 'react-redux';
// import {
//   ResponsiveContainer,
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from 'recharts';

// export default function SalesAreaChart() {
//   const { sales } = useSelector((state) => state.sale);
// console.log('Raw sales from Redux:', sales);

//   // Step 1: Group sales by Sale_date
//   const salesByDate = {};

//   sales.forEach((sale) => {
//     const date = sale.Sale_date || 'N/A';
//     const amount = sale.unit_price * sale.quantity;

//     if (!salesByDate[date]) {
//       salesByDate[date] = amount;
//     } else {
//       salesByDate[date] += amount;
//     }
//   });

//   // Step 2: Convert to chart-friendly format
//   const chartData = Object.entries(salesByDate).map(([date, total]) => ({
//     date,
//     total,
//   }));

//   return (
//     <div className="bg-white p-6 rounded-lg shadow w-full max-w-6xl mx-auto mt-6">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">📈 Daily Sales Trend</h2>

//       <ResponsiveContainer width="100%" height={300}>
//         <AreaChart
//           data={chartData}
//           margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="date" />
//           <YAxis />
//           <Tooltip
//             formatter={(value) => `${value.toLocaleString()} XAF`}
//             labelFormatter={(label) => `Date: ${label}`}
//           />
//           <Area
//             type="monotone"
//             dataKey="total"
//             stroke="#3b82f6"
//             fillOpacity={1}
//             fill="url(#colorTotal)"
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }


import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Award,
  Calendar,
  Users
} from 'lucide-react';

// Sample sales data for demonstration - replace with your actual Redux data
const sampleSalesData = [
  { id: 1, product_name: 'iPhone 14', quantity: 2, unit_price: 800000, Sale_date: '15-06-2025' },
  { id: 2, product_name: 'Samsung Galaxy', quantity: 1, unit_price: 600000, Sale_date: '15-06-2025' },
  { id: 3, product_name: 'MacBook Pro', quantity: 1, unit_price: 1200000, Sale_date: '16-06-2025' },
  { id: 4, product_name: 'iPhone 14', quantity: 3, unit_price: 800000, Sale_date: '17-06-2025' },
  { id: 5, product_name: 'iPad Air', quantity: 2, unit_price: 500000, Sale_date: '17-06-2025' },
  { id: 6, product_name: 'Samsung Galaxy', quantity: 2, unit_price: 600000, Sale_date: '18-06-2025' },
  { id: 7, product_name: 'MacBook Pro', quantity: 1, unit_price: 1200000, Sale_date: '18-06-2025' },
  { id: 8, product_name: 'iPhone 14', quantity: 1, unit_price: 800000, Sale_date: '19-06-2025' },
  { id: 9, product_name: 'AirPods Pro', quantity: 4, unit_price: 250000, Sale_date: '19-06-2025' },
  { id: 10, product_name: 'iPad Air', quantity: 1, unit_price: 500000, Sale_date: '20-06-2025' },
];

// Utility functions for data processing
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' XAF';
};

const formatDate = (dateString) => {
  try {
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit'
    });
  } catch {
    return dateString;
  }
};

// Custom tooltip components
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-semibold text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// KPI Card Component
const KPICard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200"
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp size={16} className={trend === 'down' ? 'rotate-180' : ''} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function SalesAnalytics() {
  // Replace this with your actual Redux selector
  // const { sales } = useSelector((state) => state.sale);
  const sales = sampleSalesData; // Using sample data for demo

  // Process data for analytics
  const analyticsData = useMemo(() => {
    if (!sales || sales.length === 0) return {
      kpis: {},
      trendData: [],
      productData: [],
      pieData: []
    };

    // Calculate KPIs
    const totalRevenue = sales.reduce((sum, sale) => sum + (sale.unit_price * sale.quantity), 0);
    const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalSales = sales.length;
    const avgSaleValue = totalRevenue / totalSales;

    // Find best selling product
    const productSales = {};
    sales.forEach(sale => {
      if (!productSales[sale.product_name]) {
        productSales[sale.product_name] = { quantity: 0, revenue: 0 };
      }
      productSales[sale.product_name].quantity += sale.quantity;
      productSales[sale.product_name].revenue += sale.unit_price * sale.quantity;
    });

    const bestSellingProduct = Object.entries(productSales)
      .sort(([,a], [,b]) => b.revenue - a.revenue)[0];

    // Process trend data (group by date)
    const trendMap = {};
    sales.forEach(sale => {
      const date = formatDate(sale.Sale_date);
      if (!trendMap[date]) {
        trendMap[date] = { date, revenue: 0, quantity: 0 };
      }
      trendMap[date].revenue += sale.unit_price * sale.quantity;
      trendMap[date].quantity += sale.quantity;
    });

    const trendData = Object.values(trendMap).sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );

    // Process product performance data
    const productData = Object.entries(productSales)
      .map(([name, data]) => ({
        name,
        revenue: data.revenue,
        quantity: data.quantity
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 8); // Top 8 products

    // Process pie chart data
    const pieData = productData.slice(0, 5).map(item => ({
      name: item.name,
      value: item.revenue,
      percentage: ((item.revenue / totalRevenue) * 100).toFixed(1)
    }));

    return {
      kpis: {
        totalRevenue,
        totalQuantity,
        totalSales,
        avgSaleValue,
        bestSellingProduct: bestSellingProduct ? bestSellingProduct[0] : 'N/A'
      },
      trendData,
      productData,
      pieData
    };
  }, [sales]);

  const { kpis, trendData, productData, pieData } = analyticsData;

  // Colors for charts
  const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4', '#84CC16', '#F97316'];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Analytics</h1>
          <p className="text-gray-600">Comprehensive overview of your sales performance</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Revenue"
            value={formatCurrency(kpis.totalRevenue)}
            icon={DollarSign}
            color="green"
            trend="up"
            trendValue="+12.5%"
          />
          <KPICard
            title="Total Sales"
            value={kpis.totalSales?.toLocaleString()}
            icon={ShoppingBag}
            color="blue"
            trend="up"
            trendValue="+8.2%"
          />
          <KPICard
            title="Items Sold"
            value={kpis.totalQuantity?.toLocaleString()}
            icon={Users}
            color="purple"
            trend="up"
            trendValue="+15.7%"
          />
          <KPICard
            title="Avg Sale Value"
            value={formatCurrency(kpis.avgSaleValue)}
            icon={Award}
            color="orange"
            trend="up"
            trendValue="+3.1%"
          />
        </div>

        {/* Best Selling Product Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <Award size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Best Selling Product</h3>
              <p className="text-2xl font-bold">{kpis.bestSellingProduct}</p>
            </div>
          </div>
        </div>

        {/* Sales Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Sales Trend</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar size={16} />
              <span>Last 7 Days</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Performance Bar Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Product Performance</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    type="number" 
                    stroke="#6b7280"
                    fontSize={12}
                    tickFormatter={(value) => `${(value / 1000)}K`}
                  />
                  <YAxis 
                    type="category" 
                    dataKey="name" 
                    stroke="#6b7280"
                    fontSize={12}
                    width={100}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar 
                    dataKey="revenue" 
                    fill="#3B82F6"
                    radius={[0, 4, 4, 0]}
                    name="Revenue"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales Distribution Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sales Distribution</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    formatter={(value, entry) => `${value} (${entry.payload.percentage}%)`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Stats Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Products Overview</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Sold</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Share</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {productData.slice(0, 5).map((product, index) => (
                  <tr key={product.name} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-3"
                          style={{ backgroundColor: colors[index % colors.length] }}
                        />
                        <span className="text-sm font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.quantity.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {((product.revenue / kpis.totalRevenue) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}