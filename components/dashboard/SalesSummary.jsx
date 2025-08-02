// components/dashboard/SalesSummary.jsx
'use client';

import React from 'react';
const SalesSummary = ({ sales }) => {
  const calculateStats = () => {
    let totalRevenue = 0;
    let totalItems = 0;
    const productCount = {};
    
    sales.forEach(sale => {
      const saleTotal = sale.unit_price * sale.quantity;
      totalRevenue += saleTotal;
      totalItems += sale.quantity;
      
      if (!productCount[sale.product_id]) {
        productCount[sale.product_id] = {
          name: sale.product_name,
          count: 0
        };
      }
      productCount[sale.product_id].count += sale.quantity;
    });
    
    const avgSale = sales.length > 0 ? totalRevenue / sales.length : 0;
    const topProduct = Object.values(productCount).sort((a, b) => b.count - a.count)[0];
    
    return {
      totalRevenue,
      totalItems,
      totalTransactions: sales.length,
      avgSale,
      topProduct: topProduct || null
    };
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-5 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Total Sales Revenue</h3>
        <p className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)},XAF</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Items Sold</h3>
        <p className="text-2xl font-bold">{stats.totalItems}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Transactions</h3>
        <p className="text-2xl font-bold">{stats.totalTransactions}</p>
      </div>
      {/* <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-gray-500 text-sm">Avg. Sale</h3>
        <p className="text-2xl font-bold">${stats.avgSale.toFixed(2)}</p>
      </div> */}
    </div>
  );
};

export default SalesSummary;