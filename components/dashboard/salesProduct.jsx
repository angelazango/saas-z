'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

export default function TopSellingProductsChart({ products }) {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const grouped = {};

      // Aggregate by category + product
      products.forEach((product) => {
        const key = `${product.category_name} - ${product.product_name}`;
        grouped[key] = (grouped[key] || 0) + (product.quantity_sold || 0);
      });

      // Convert and sort descending
      const sorted = Object.entries(grouped)
        .map(([name, sales]) => ({ name, sales }))
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 5); // Top 5

      setTopProducts(sorted);
    }
  }, [products]);

  return (
    <div className="w-full h-[400px] mt-10 bg-white p-4 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4 text-gray-700">Top 5 Best-Selling Products</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={topProducts}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="sales" fill="#8884d8">
            {topProducts.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
