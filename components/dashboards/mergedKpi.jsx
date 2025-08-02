'use client';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Package, Users, TrendingUp, ShoppingCart, Factory, DollarSign } from 'lucide-react';

export default function MergedKpiCards() {
  const sales = useSelector((state) => state.sale.sales);
  const purchases = useSelector((state) => state.purchase?.purchases || []);
  const { sessionProducts = [] } = useSelector((state) => state.sessionProduct || {});
  const teams = useSelector((state) => state.team?.teams || []);

  // 🧮 Sales KPIs
  const salesKpis = useMemo(() => {
    let totalRevenue = 0;
    let totalQuantity = 0;
    let todaySales = 0;
    const today = new Date().toISOString().split('T')[0];

    sales.forEach((sale) => {
      totalRevenue += sale.quantity * sale.selling_price;
      totalQuantity += sale.quantity;
      if (sale.sale_date === today) todaySales += 1;
    });

    return {
      totalRevenue,
      totalQuantity,
      totalSales: sales.length,
      todaySales,
    };
  }, [sales]);

  // 🧮 Purchase KPIs
  const totalPurchases = purchases.length;
  const purchaseQuantity = purchases.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalSpend = purchases.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);

  // 🧮 Production KPIs
  const productionKpis = useMemo(() => {
    let total = 0;
    sessionProducts.forEach((p) => {
      total += Number(p.quantity);
    });
    return { total };
  }, [sessionProducts]);

  // 🧮 Team KPI
  const totalTeams = teams.length;

  const kpiData = [
    {
      title: "Total Revenue",
      value: `XAF ${salesKpis.totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "emerald",
      trend: "+12.5%",
      description: "Total sales revenue"
    },
    {
      title: "Total Block Produced",
      value: productionKpis.total.toLocaleString(),
      icon: <Factory className="w-5 h-5" />,
      color: "amber",
      trend: "+15.3%",
      description: "Product output"
    },
    {
      title: "Total Spend",
      value: `XAF ${totalSpend.toLocaleString()}`,
      icon: <Package className="w-5 h-5" />,
      color: "purple",
      trend: "-3.1%",
      description: "Total costs"
    },
    {
      title: "Active Teams",
      value: totalTeams.toString(),
      icon: <Users className="w-5 h-5" />,
      color: "rose",
      trend: "+5.0%",
      description: "Teams on the Field"
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <KpiCard key={index} {...kpi} />
        ))}
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon, color, trend, description }) {
  const colorSchemes = {
    emerald: {
      border: 'border-emerald-300',
      iconBg: 'bg-emerald-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'
    },
    blue: {
      border: 'border-blue-300',
      iconBg: 'bg-blue-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-blue-600' : 'text-rose-600'
    },
    amber: {
      border: 'border-amber-300',
      iconBg: 'bg-amber-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-amber-600' : 'text-rose-600'
    },
    purple: {
      border: 'border-purple-300',
      iconBg: 'bg-purple-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-purple-600' : 'text-rose-600'
    },
    rose: {
      border: 'border-rose-300',
      iconBg: 'bg-rose-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-rose-600' : 'text-rose-600'
    }
  };

  const scheme = colorSchemes[color];

  return (
    <div className={`
      relative overflow-hidden rounded-lg border-b ${scheme.border} bg-white
      transition-all duration-200 ease-in-out
      hover:shadow-md hover:border-gray-300
      group cursor-pointer
      min-h-[140px] p-5 
    `}>
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-3">
          <div className={`
            ${scheme.iconBg} ${scheme.iconText} 
            p-2 rounded-lg
            transition-transform duration-200
          `}>
            {icon}
          </div>
          
          {/* Trend indicator */}
          <div className={`
            ${scheme.trendText}
            text-xs font-medium
            flex items-center gap-1
          `}>
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
              {title}
            </h3>
            <p className={`
              ${scheme.valueText} text-xl font-semibold 
              leading-tight
            `}>
              {value}
            </p>
          </div>
          
          <p className="text-gray-400 text-xs mt-2">
            {description}
          </p>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
    </div>
  );
}