'use client';
import { useSelector } from 'react-redux';

export default function PurchasesKPI() {
  const purchases = useSelector((state) => state.purchase.purchases || []);

  const totalQuantity = purchases.reduce((sum, p) => sum + (p.quantity || 0), 0);
  const totalAmount = purchases.reduce((sum, p) => sum + (p.total_price || 0), 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-gray-600 text-sm font-medium">Total Purchases</h4>
        <p className="text-2xl font-bold text-blue-600">{purchases.length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-gray-600 text-sm font-medium">Total Quantity</h4>
        <p className="text-2xl font-bold text-indigo-600">{totalQuantity}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-gray-600 text-sm font-medium">Total Cost</h4>
        <p className="text-2xl font-bold text-green-600">{totalAmount.toLocaleString()} XAF</p>
      </div>
    </div>
  );
}
