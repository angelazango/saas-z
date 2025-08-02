'use client';
import { useSelector } from 'react-redux';
import { DollarSign, Package, ShoppingCart, Archive, TrendingUp } from 'lucide-react';

export default function KPIOverview() {
  const { sales = [] } = useSelector((state) => state.sale);
  const { purchases = [] } = useSelector((state) => state.purchase);
  const { products = [] } = useSelector((state) => state.product);

  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.unit_price * sale.quantity), 0);
  const totalPurchaseCost = purchases.reduce((sum, p) => sum + (p.total_price || 0), 0);

  const kpiData = [
    {
      title: 'Total Sales',
      value: sales.length,
      icon: <ShoppingCart className="w-5 h-5" />,
      color: 'blue',
      trend: '+4.2%',
      description: 'All sales transactions'
    },
    {
      title: 'Total Revenue',
      value: `XAF ${totalRevenue.toLocaleString()}`,
      icon: <DollarSign className="w-5 h-5" />,
      color: 'emerald',
      trend: '+8.9%',
      description: 'Income from sales'
    },
    {
      title: 'Total Purchases',
      value: purchases.length,
      icon: <Package className="w-5 h-5" />,
      color: 'amber',
      trend: '-2.1%',
      description: 'All supply purchases'
    },
    {
      title: 'Total Products',
      value: products.length,
      icon: <Archive className="w-5 h-5" />,
      color: 'purple',
      trend: '+1.5%',
      description: 'Available product items'
    }
  ];

  return (
    <div className="w-full px-6">
      <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
  };

  const scheme = colorSchemes[color];

  return (
    <div className={`relative overflow-hidden rounded-lg border-b ${scheme.border} bg-white transition-all duration-200 ease-in-out hover:shadow-md hover:border-gray-300 group cursor-pointer min-h-[140px] p-5`}>
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <div className={`${scheme.iconBg} ${scheme.iconText} p-2 rounded-lg transition-transform duration-200`}>
            {icon}
          </div>
          <div className={`${scheme.trendText} text-xs font-medium flex items-center gap-1`}>
            <TrendingUp className="w-3 h-3" />
            {trend}
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">{title}</h3>
            <p className={`${scheme.valueText} text-xl font-semibold leading-tight`}>{value}</p>
          </div>
          <p className="text-gray-400 text-xs mt-2">{description}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"></div>
    </div>
  );
}
