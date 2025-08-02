'use client';
import { useSelector } from 'react-redux';

export default function SalesKPI() {
  const sales = useSelector((state) => state.sale.sales || []);

  const totalRevenue = sales.reduce((sum, sale) => sum + (sale.unit_price * sale.quantity), 0);
  const totalQuantity = sales.reduce((sum, sale) => sum + sale.quantity, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-gray-600 text-sm font-medium">Total Sales</h4>
        <p className="text-2xl font-bold text-blue-600">{sales.length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-gray-600 text-sm font-medium">Total Quantity Sold</h4>
        <p className="text-2xl font-bold text-indigo-600">{totalQuantity}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h4 className="text-gray-600 text-sm font-medium">Total Revenue</h4>
        <p className="text-2xl font-bold text-green-600">{totalRevenue.toLocaleString()} XAF</p>
      </div>
    </div>
  );
}
