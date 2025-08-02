'use client';

import { useSelector } from 'react-redux';
import { useMemo } from 'react';

export default function TopPurchasedMaterialsTable() {
  const purchases = useSelector((state) => state.purchase.purchases || []);

  const topMaterials = useMemo(() => {
    const map = {};

    purchases.forEach((purchase) => {
      const key = purchase.material_name;

      if (!map[key]) {
        map[key] = {
          material: purchase.material_name,
          unit: purchase.unit,
          quantity: 0,
          total: 0,
        };
      }

      map[key].quantity += purchase.quantity;
      map[key].total += purchase.quantity * purchase.price;
    });

    return Object.values(map)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 6); // Top 10
  }, [purchases]);

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-2">
      <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-gray-200 pb-3">
        Top  Purchased Materials
      </h3>
      
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700
               uppercase tracking-wider">
                Rank
              </th>
              <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 
              uppercase tracking-wider">
                Material
              </th>
              <th className="py-3 px-4 text-left font-semibold text-sm text-gray-700 uppercase tracking-wider">
                Quantity
              </th>
              <th className="py-3 px-4 text-left font-semibold text-sm
               text-gray-700 uppercase tracking-wider">
                Total Spent (XAF)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {topMaterials.map((item, index) => (
              <tr 
                key={index} 
                className={`
                  hover:bg-gray-50 transition-colors duration-200
                  ${index < 3 ? 'bg-blue-50/30' : 'bg-white'}
                `}
              >
                <td className="py-3 ">
                  <div className="flex items-center">
                    <span className={`
                      inline-flex items-center justify-center w-8 rounded-full text-sm font-bold
                      ${index === 0 ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300' : ''}
                      ${index === 1 ? 'bg-gray-100 text-gray-800 border-2 border-gray-300' : ''}
                      ${index === 2 ? 'bg-orange-100 text-orange-800 border-2 border-orange-300' : ''}
                      ${index > 2 ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' : ''}
                    `}>
                      {index + 1}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 font-medium text-gray-900">
                  {item.material}
                </td>
                <td className="py-3 px-4 text-gray-700">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-gray-100 text-gray-800 border">
                    {item.quantity} {item.unit}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-gray-900">
                  {item.total.toLocaleString()} XAF
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    
    </div>
  );
}