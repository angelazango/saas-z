'use client';
import { useState, useEffect } from 'react';

export default function PurchaseList() {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('purchases') || '[]');
    setPurchases(stored);
  }, []);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div className="max-w-5xl mx-auto p-4 mt-6">
      <h2 className="text-2xl font-semibold mb-4">Purchase History</h2>

      {purchases.length === 0 ? (
        <p className="text-gray-600">No purchases made yet.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Unit Price</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((p) => (
              <tr key={p.id}>
                <td className="p-2 border">{p.product_name}</td>
                <td className="p-2 border">{p.quantity}</td>
                <td className="p-2 border">${p.unit_price.toFixed(2)}</td>
                <td className="p-2 border font-semibold">${p.total.toFixed(2)}</td>
                <td className="p-2 border text-sm text-gray-600">{formatDate(p.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
