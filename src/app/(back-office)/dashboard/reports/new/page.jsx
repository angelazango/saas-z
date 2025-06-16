'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  createPurchaseStart,
  createPurchaseSuccess,
  createPurchaseFailure,
} from '@/src/redux/slice/purchaseSlice';
import { URL } from '@/config';

export default function PurchaseForm({ onCancel, onSuccess, productId }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.purchase);

  // Initialize with productId if provided
  const [formData, setFormData] = useState({
    product_id: productId || '',
    quantity: 1,
    total_price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(createPurchaseStart());
      const response = await axios.post(`${URL}/purchase`, formData);
      dispatch(createPurchaseSuccess(response.data));

      alert('Purchase created successfully!');
      if (onSuccess) onSuccess();
    } catch (err) {
      dispatch(createPurchaseFailure(err.response?.data?.message || 'Failed to create purchase.'));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Purchase</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Price</label>
            <input
              type="number"
              name="total_price"
              min="0"
              step="0.01"
              value={formData.total_price}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">Error: {error}</p>}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 p-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Create Purchase'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}