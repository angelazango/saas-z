'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';


import {
  createPurchaseStart,
  createPurchaseSuccess,
  createPurchaseFailure,
  updatePurchaseStart,
  updatePurchaseSuccess,
  updatePurchaseFailure,
} from '@/src/redux/blockSlice/purchasesSlice';

import { URL } from '@/config';

export default function PurchaseForm({ purchase, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    material_id: '',
    quantity: 1,
    price: 0,
    unit: 'bags',
    purchase_date: new Date().toISOString().split('T')[0], // Default to today
  });
  const [materials, setMaterials] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (purchase) {
      setFormData({
        material_id: purchase.material_id,
        quantity: purchase.quantity,
        price: purchase.price,
        unit: purchase.unit,
        purchase_date: purchase.purchase_date,
      });
    }
    // Fetch available materials
    const fetchMaterials = async () => {
      try {
        const response = await axios.get(`${URL}/blocks/material`);
        setMaterials(response.data.materials || []);
      } catch (err) {
        console.error('Failed to fetch materials:', err);
      }
    };
    fetchMaterials();
  }, [purchase]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? 
        parseFloat(value) || 0 : 
        value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (purchase) {
        dispatch(updatePurchaseStart());
        const response = await axios.put(
          `${URL}/blocks/purchase/${purchase.id}`,
          formData
        );
        dispatch(updatePurchaseSuccess(response.data));
      } else {
        dispatch(createPurchaseStart());
        const response = await axios.post(`${URL}/blocks/purchase`, formData);
        dispatch(createPurchaseSuccess(response.data));
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (purchase ? 'Failed to update purchase.' : 'Failed to create purchase.');
      setError(errorMessage);
      dispatch(purchase ? updatePurchaseFailure(errorMessage) : createPurchaseFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {purchase ? 'Edit Purchase' : 'Add New Purchase'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Material *</label>
            <select
              name="material_id"
              value={formData.material_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Material</option>
              {materials.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.material_name} ({material.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity *</label>
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
            <label className="block text-sm font-medium mb-1">Unit *</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="bags">Bags</option>
              <option value="kg">Kilograms</option>
              <option value="liters">Liters</option>
              <option value="pieces">Pieces</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (XAF) *</label>
            <input
              type="number"
              name="price"
              min="0"
              step="1"
              value={formData.price}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Purchase Date *</label>
            <input
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (purchase ? 'Updating...' : 'Creating...') 
                : (purchase ? 'Update Purchase' : 'Create Purchase')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}