'use client';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  Package,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Layers3,
  ShoppingBasket,
} from 'lucide-react';

export default function MergedKpiCards() {
  const sales = useSelector((state) => state.sale.sales || []);
  const purchases = useSelector((state) => state.purchase.purchases || []);

  // 🧮 Sales KPIs
  const salesKpis = useMemo(() => {
    const totalSales = sales.length;
    const totalSalesQty = sales.reduce((sum, s) => sum + (s.quantity || 0), 0);
    const totalRevenue = sales.reduce((sum, s) => sum + (s.unit_price * s.quantity || 0), 0);
    return { totalSales, totalSalesQty, totalRevenue };
  }, [sales]);

  // 🧮 Purchases KPIs
  const purchaseKpis = useMemo(() => {
    const totalPurchases = purchases.length;
    const totalPurchaseQty = purchases.reduce((sum, p) => sum + (p.quantity || 0), 0);
    const totalCost = purchases.reduce((sum, p) => sum + (p.total_price || 0), 0);
    return { totalPurchases, totalPurchaseQty, totalCost };
  }, [purchases]);

  const kpiData = [
    {
      title: "Sales Revenue",
      value: `${salesKpis.totalRevenue.toLocaleString()} XAF`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "emerald",
      trend: "+8.2%",
      description: "Total revenue from sales",
    },
    {
      title: "Total Sales",
      value: salesKpis.totalSales.toString(),
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "blue",
      trend: "+6.0%",
      description: "Number of sales made",
    },
    {
      title: "Sales Quantity",
      value: salesKpis.totalSalesQty.toString(),
      icon: <Layers3 className="w-5 h-5" />,
      color: "amber",
      trend: "+4.1%",
      description: "Total items sold",
    },
    {
      title: "Total Purchases",
      value: purchaseKpis.totalPurchases.toString(),
      icon: <ShoppingBasket className="w-5 h-5" />,
      color: "blue",
      trend: "+5.5%",
      description: "Number of purchases",
    },
    // {
    //   title: "Purchase Quantity",
    //   value: purchaseKpis.totalPurchaseQty.toString(),
    //   icon: <Package className="w-5 h-5" />,
    //   color: "purple",
    //   trend: "+2.4%",
    //   description: "Items purchased",
    // },
    {
      title: "Purchase Cost",
      value: `${purchaseKpis.totalCost.toLocaleString()} XAF`,
      icon: <DollarSign className="w-5 h-5" />,
      color: "rose",
      trend: "-1.2%",
      description: "Total amount spent",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-5 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
      trendText: trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600',
    },
    blue: {
      border: 'border-blue-300',
      iconBg: 'bg-blue-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-blue-600' : 'text-rose-600',
    },
    amber: {
      border: 'border-amber-300',
      iconBg: 'bg-amber-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-amber-600' : 'text-rose-600',
    },
    purple: {
      border: 'border-purple-300',
      iconBg: 'bg-purple-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-purple-600' : 'text-rose-600',
    },
    rose: {
      border: 'border-rose-300',
      iconBg: 'bg-rose-600',
      iconText: 'text-white',
      valueText: 'text-gray-900',
      trendText: trend.startsWith('+') ? 'text-rose-600' : 'text-rose-600',
    },
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
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className={`${scheme.iconBg} ${scheme.iconText} p-2 rounded-lg`}>
            {icon}
          </div>
          <div className={`${scheme.trendText} text-xs font-medium flex items-center gap-1`}>
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
              {title}
            </h3>
            <p className={`${scheme.valueText} text-xl font-semibold`}>
              {value}
            </p>
          </div>
          <p className="text-gray-400 text-xs mt-2">{description}</p>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
    </div>
  );
}
