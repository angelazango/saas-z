// components/SalesKpiCards.jsx
'use client';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';


export default function SalesKpiCards() {
  const sales = useSelector((state) => state.sale.sales);

  const kpis = useMemo(() => {
    let totalRevenue = 0;
    let totalQuantity = 0;
    const today = new Date().toISOString().split('T')[0];

    let todaySales = 0;

    sales.forEach((sale) => {
      totalRevenue += sale.quantity * sale.selling_price;
      totalQuantity += sale.quantity;
      if (sale.sale_date === today) {
        todaySales += 1;
      }
    });

    return {
      totalRevenue,
      totalQuantity,
      totalSales: sales.length,
      todaySales,
    };
  }, [sales]);

  return (
    <div className="grid grid-cols-4 lg:grid-cols-4 gap-6 p-2">
      <KPI 
        title="Total Revenue" 
        value={`XAF ${kpis.totalRevenue.toLocaleString()}`}
        gradient="from-emerald-500 to-teal-600"
        icon="💰"
        bgPattern="revenue"
      />
      <KPI 
        title="Total Quantity Sold" 
        value={kpis.totalQuantity}
        gradient="from-blue-500 to-indigo-600"
        icon="📦"
        bgPattern="quantity"
      />
      {/* <KPI 
        title="Sales Count" 
        value={kpis.totalSales}
        gradient="from-purple-500 to-violet-600"
        icon="📊"
        bgPattern="sales"
      /> */}
      {/* <KPI 
        title="Today's Sales" 
        value={kpis.todaySales}
        gradient="from-orange-500 to-red-500"
        icon="🔥"
        bgPattern="today"
      /> */}
    </div>
  );
}

function KPI({ title, value, gradient, icon, bgPattern }) {
  return (
    <div className="group relative overflow-hidden">
      {/* Animated background pattern */}
      <div className={`absolute inset-0 opacity-5 ${getPatternClass(bgPattern)}`}></div>
      
      {/* Gradient border */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-sm opacity-30 group-hover:opacity-50 transition-all duration-300`}></div>
      
      {/* Main card */}
      <div className="relative bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 border border-white/20">
        
        {/* Floating icon */}
        <div className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center text-lg opacity-20 group-hover:opacity-40 transition-opacity duration-300">
          {icon}
        </div>
        
        {/* Animated glow effect */}
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradient} rounded-t-2xl`}></div>
        
        {/* Content */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl">{icon}</span>
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {title}
            </h3>
          </div>
          
          <div className="relative">
            <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-br ${gradient} bg-clip-text text-transparent drop-shadow-sm`}>
              {value}
            </p>
            
            {/* Animated underline */}
            <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r ${gradient} transition-all duration-300 w-0 group-hover:w-full rounded-full`}></div>
          </div>
        </div>
        
        {/* Hover shimmer effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
        </div>
      </div>
    </div>
  );
}

function getPatternClass(pattern) {
  const patterns = {
    revenue: 'bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1)_0%,transparent_50%)]',
    quantity: 'bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.1)_0%,transparent_60%)]',
    sales: 'bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.1)_0%,transparent_50%)]',
    today: 'bg-[radial-gradient(circle_at_40%_60%,rgba(249,115,22,0.1)_0%,transparent_50%)]',
  };
  return patterns[pattern] || patterns.revenue;
}