

// 'use client'

// import React, { useState, useEffect } from 'react';
// import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { TrendingUp, TrendingDown, Package, DollarSign, ShoppingCart, AlertTriangle, Wrench, Settings } from 'lucide-react';

// const HardwareStoreAnalyticsDashboard = () => {
//   // Sample data - replace with your Redux state
//   const [dashboardData, setDashboardData] = useState({
//     keyMetrics: {
//       totalRevenue: 5064264,
//       revenueGrowth: 12.4,
//       totalSales: 1247,
//       salesGrowth: 8.7,
//       totalPurchases: 234,
//       purchaseGrowth: -3.1,
//       lowStockItems: 12
//     },
//     salesDetails: [
//       { day: '5k', sales: 19, purchases: 15 },
//       { day: '10k', sales: 32, purchases: 28 },
//       { day: '15k', sales: 28, purchases: 22 },
//       { day: '20k', sales: 45, purchases: 38 },
//       { day: '25k', sales: 52, purchases: 45 },
//       { day: '30k', sales: 48, purchases: 42 },
//       { day: '35k', sales: 58, purchases: 51 },
//       { day: '40k', sales: 23, purchases: 20 },
//       { day: '45k', sales: 67, purchases: 58 },
//       { day: '50k', sales: 54, purchases: 48 },
//       { day: '55k', sales: 41, purchases: 36 },
//       { day: '60k', sales: 49, purchases: 44 }
//     ],
//     revenueByCategory: [
//       { name: 'Power Tools', value: 1685000, color: '#3B82F6' },
//       { name: 'Screws & Fasteners', value: 1326000, color: '#EF4444' },
//       { name: 'Plumbing', value: 1122000, color: '#10B981' },
//       { name: 'Electrical', value: 954000, color: '#F59E0B' },
//       { name: 'Hardware', value: 738000, color: '#8B5CF6' },
//       { name: 'Others', value: 516000, color: '#6B7280' }
//     ],
//     topSellingProducts: [
//       { name: 'Bosch Drill 18V', current: 89, target: 100, category: 'Tools' },
//       { name: 'Stainless Steel Screws 4x40mm', current: 76, target: 90, category: 'Fasteners' },
//       { name: 'Basin Tap', current: 62, target: 80, category: 'Plumbing' },
//       { name: 'Cable 2.5mm²', current: 54, target: 70, category: 'Electrical' },
//       { name: 'Padlock 40mm', current: 41, target: 60, category: 'Security' }
//     ],
//     inventoryLevels: [
//       { category: 'Tools', inStock: 145, reorderLevel: 30, unit: 'pcs' },
//       { category: 'Fasteners', inStock: 2850, reorderLevel: 500, unit: 'pcs' },
//       { category: 'Plumbing', inStock: 78, reorderLevel: 20, unit: 'pcs' },
//       { category: 'Electrical', inStock: 234, reorderLevel: 50, unit: 'pcs' },
//       { category: 'Hardware', inStock: 167, reorderLevel: 40, unit: 'pcs' }
//     ]
//   });

//   // Simulate real-time updates
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setDashboardData(prev => ({
//         ...prev,
//         keyMetrics: {
//           ...prev.keyMetrics,
//           totalRevenue: prev.keyMetrics.totalRevenue + Math.floor(Math.random() * 500),
//           totalSales: prev.keyMetrics.totalSales + Math.floor(Math.random() * 5)
//         }
//       }));
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const MetricCard = ({ title, value, growth, icon: Icon, format = 'number' }) => (
//     <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-sm text-gray-600 mb-1">{title}</p>
//           <p className="text-2xl font-bold text-gray-900">
//             {format === 'currency' ? `${value.toLocaleString()} CFA` : value.toLocaleString()}
//           </p>
//         </div>
//         <div className="p-3 bg-blue-100 rounded-full">
//           <Icon className="w-6 h-6 text-blue-600" />
//         </div>
//       </div>
//       <div className="flex items-center mt-4">
//         {growth >= 0 ? (
//           <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
//         ) : (
//           <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
//         )}
//         <span className={`text-sm ${growth >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//           {Math.abs(growth)}%
//         </span>
//         <span className="text-sm text-gray-500 ml-1">vs last month</span>
//       </div>
//     </div>
//   );

//   const BulletChart = ({ data }) => (
//     <div className="space-y-4">
//       {data.map((item, index) => (
//         <div key={index} className="relative">
//           <div className="flex justify-between items-center">
//             <span className="text-sm font-medium text-gray-700">{item.name}</span>
//             <span className="text-sm text-gray-500">{item.current}/{item.target}</span>
//           </div>
//           <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-blue-500 rounded-full transition-all duration-500"
//               style={{ width: `${(item.current / item.target) * 100}%` }}
//             />
//             <div 
//               className="absolute top-0 h-full w-1 bg-gray-800"
//               style={{ left: `${(item.target * 0.8 / item.target) * 100}%` }}
//             />
//           </div>
//           <div className="text-xs text-gray-500 mt-1">{item.category}</div>
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 flex items-center">
//                 <Wrench className="mr-3 text-blue-600" />
//                Dashboard
//               </h1>
             
//             </div>
//             <div className="bg-white rounded-lg shadow-sm px-4 py-2 border">
//               <select className="text-sm text-gray-700 bg-transparent border-none outline-none">
//                 <option>June</option>
//                 <option>October</option>
//                 <option>September</option>
//                 <option>August</option>
//                 <option>July</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Key Metrics Cards */}
//         <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <MetricCard
//             title="Total Revenue"
//             value={dashboardData.keyMetrics.totalRevenue}
//             growth={dashboardData.keyMetrics.revenueGrowth}
//             icon={DollarSign}
//             format="currency"
//           />
//           <MetricCard
//             title="Total Sales"
//             value={dashboardData.keyMetrics.totalSales}
//             growth={dashboardData.keyMetrics.salesGrowth}
//             icon={ShoppingCart}
//           />
//           <MetricCard
//             title="Total Purchases"
//             value={dashboardData.keyMetrics.totalPurchases}
//             growth={dashboardData.keyMetrics.purchaseGrowth}
//             icon={Package}
//           />
//           <MetricCard
//             title="Low Stock Items"
//             value={dashboardData.keyMetrics.lowStockItems}
//             growth={0}
//             icon={AlertTriangle}
//           />
//         </div>

//         {/* Main Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
//           {/* Sales Details Chart - Matching the provided image */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Sales Details</h3>
//               <div className="flex items-center text-sm text-gray-600">
//                 <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
//                   {dashboardData.keyMetrics.totalRevenue.toLocaleString()} CFA
//                 </span>
//               </div>
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart data={dashboardData.salesDetails} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
//                 <defs>
//                   <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
//                     <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis 
//                   dataKey="day" 
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 12, fill: '#6B7280' }}
//                 />
//                 <YAxis 
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fontSize: 12, fill: '#6B7280' }}
//                   tickFormatter={(value) => `${value}%`}
//                 />
//                 <Tooltip 
//                   formatter={(value, name) => [`${value}%`, name === 'sales' ? 'Sales' : 'Purchases']}
//                   labelFormatter={(label) => `Period: ${label}`}
//                   contentStyle={{
//                     backgroundColor: '#1F2937',
//                     border: 'none',
//                     borderRadius: '8px',
//                     color: 'white'
//                   }}
//                 />
//                 <Area 
//                   type="monotone" 
//                   dataKey="sales" 
//                   stroke="#3B82F6" 
//                   strokeWidth={2}
//                   fill="url(#colorSales)"
//                   dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#ffffff' }}
//                   activeDot={{ r: 6, fill: '#3B82F6', strokeWidth: 2, stroke: '#ffffff' }}
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Revenue by Category Pie Chart */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue by Category</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={dashboardData.revenueByCategory}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={120}
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {dashboardData.revenueByCategory.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip formatter={(value) => [`${value.toLocaleString()} CFA`, 'Revenue']} />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="grid grid-cols-2 lg:grid-cols-2 gap-6">
//           {/* Top Selling Products - Bullet Chart */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Selling Products</h3>
//             <BulletChart data={dashboardData.topSellingProducts} />
//           </div>

//           {/* Inventory Levels Bar Chart */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Inventory Levels</h3>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={dashboardData.inventoryLevels}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="category" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="inStock" fill="#10B981" name="In Stock" />
//                 <Bar dataKey="reorderLevel" fill="#F59E0B" name="Reorder Level" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Live Updates Indicator */}
//         <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg">
//           <div className="flex items-center">
//             <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2"></div>
//             Live Updates Active
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HardwareStoreAnalyticsDashboard;


'use client';
import { useFetchSalesRealtime } from '@/src/hooks/second/useSales';
import SalesChart from '@/components/dashboard/SalesChart';

import SalesKPI from '@/components/dashboard/salesKpi';
import KPI from '@/components/dashboard/Kpi';


// import { useFetchPurchasesRealtime } from '@/src/hooks/second/usePurchases';
import { useFetchPurchasesRealtime } from '@/src/hooks/second/usePurchases';
import PurchasesKPI from '@/components/dashboard/purchaseKpi';
import PurchasesChart from '@/components/dashboard/purchaseChart';
import TopSellingProductsPieChart from '@/components/dashboard/topItem';

export default function DashboardPage() {
  useFetchSalesRealtime(); // 🔁 activate real-time fetching
useFetchPurchasesRealtime();
  return (
    <div className="p-6 ml-5 space-y-6">

         <div> 
          <KPI />
        
    </div>
     
      <SalesChart />

      <div className='grid grid-cols-2 gap-4'>
<PurchasesChart />
      <TopSellingProductsPieChart />
      </div>
      
      {/* Add more components here later */}
    </div>
  );
}
