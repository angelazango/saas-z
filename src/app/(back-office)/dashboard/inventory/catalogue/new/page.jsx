// src/app/catalog/new/page.jsx
'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '@/config';

export default function CatalogForm({ catalogItem, onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    product_name: '',
    unit_price: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ensure the form resets when catalogItem changes (important when reusing the modal)
  useEffect(() => {
    setFormData({
      product_name: catalogItem?.product_name || '',
      unit_price: catalogItem?.unit_price || 0,
    });
  }, [catalogItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'unit_price' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        product_name: formData.product_name,
        unit_price: formData.unit_price,
      };

      if (catalogItem) {
        await axios.put(`${URL}/catalog/${catalogItem.id}`, payload);
      } else {
        await axios.post(`${URL}/catalog`, payload);
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save catalog item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {catalogItem ? 'Edit Catalog Item' : 'Add New Catalog Item'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price (XAF)
              </label>
              <input
                type="number"
                name="unit_price"
                min="0"
                step="1"
                value={formData.unit_price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save Item'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
