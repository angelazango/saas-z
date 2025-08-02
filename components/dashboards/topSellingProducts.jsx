'use client';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function TopSellingProducts() {
  const sales = useSelector((state) => state.sale.sales || []);
  
  const topProducts = useMemo(() => {
    const map = {};
    // Group by product and sum quantity
    sales.forEach((sale) => {
      const key = sale.product_name;
      if (!map[key]) {
        map[key] = 0;
      }
      map[key] += sale.quantity;
    });
    
    const totalQuantity = Object.values(map).reduce((sum, qty) => sum + qty, 0);
    
    return Object.entries(map)
      .map(([name, qty]) => ({
        name,
        quantity: qty,
        percent: ((qty / totalQuantity) * 100).toFixed(1),
      }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5); // Top 5
  }, [sales]);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100/50 p-6 mt-1 backdrop-blur-sm">
      <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-6">
        Top Selling Blocks Products
      </h3>
      
      <div className="space-y-5">
        {topProducts.map((prod, idx) => (
          <div key={idx} className="group">
            <div className="flex justify-between items-center text-sm font-semibold text-gray-700 mb-2">
              <span className="group-hover:text-gray-900 transition-colors duration-200">
                {prod.name}
              </span>
              {/* <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent font-bold">
                {prod.quantity} sold
              </span> */}
            </div>
            
            <div className="relative">
              <div className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-4 shadow-inner overflow-hidden">
                <div
                  className="h-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-700 shadow-sm transition-all duration-700 ease-out relative overflow-hidden"
                  style={{ width: `${prod.percent}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-black/10"></div>
                </div>
              </div>
              
              <div className="absolute -top-1 right-0 text-xs font-medium
               text-gray-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-gray-200/50">
                {prod.percent}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}