'use client';

import { Package } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function PurchaseKpiCards() {
  const purchases = useSelector((state) => state.purchase?.purchases || []);

  const totalPurchases = purchases.length;
  const totalQuantity = purchases.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalSpend = purchases.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 0)), 0);

  return (
    <div className="grid grid-cols-3 gap-6">
      <Card title="Total Purchases" value={totalPurchases} icon={Package} color="text-blue-600" />
      <Card title="Total Quantity" value={totalQuantity.toLocaleString()} icon={Package} color="text-green-600" />
      <Card title="Total Spend (XAF)" value={totalSpend.toLocaleString()} icon={Package} color="text-purple-600" />
    </div>
  );
}

function Card({ title, value, icon: Icon, color }) {
  return (
    <div className="p-6 bg-white rounded-lg shadow flex flex-col items-center justify-center">
      <Icon className={`h-8 w-8 ${color} mb-2`} />
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}
