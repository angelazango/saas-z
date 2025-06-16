'use client';
import { useState } from 'react';

export default function PurchaseForm({ onNewPurchase }) {
  const [formData, setFormData] = useState({
    product_name: '',
    quantity: '',
    unit_price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { product_name, quantity, unit_price } = formData;

    const newPurchase = {
      id: Date.now(),
      product_name,
      quantity: Number(quantity),
      unit_price: Number(unit_price),
      total: Number(quantity) * Number(unit_price),
      date: new Date().toISOString(),
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('purchases') || '[]');
    const updated = [newPurchase, ...existing];
    localStorage.setItem('purchases', JSON.stringify(updated));

    setFormData({ product_name: '', quantity: '', unit_price: '' });

    if (onNewPurchase) onNewPurchase(newPurchase);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">Add Purchase</h2>

      <div>
        <label className="block text-sm font-medium">Product Name</label>
        <input
          type="text"
          name="product_name"
          value={formData.product_name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Unit Price</label>
        <input
          type="number"
          name="unit_price"
          step="0.01"
          value={formData.unit_price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
      </div>

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Add Purchase
      </button>
    </form>
  );
}
