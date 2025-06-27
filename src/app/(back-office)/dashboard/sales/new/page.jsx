'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '@/config';

export default function SaleForm({ sale, onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    product_id: sale?.product_id || '',
    quantity: sale?.quantity || 1,
    unit_price: sale?.unit_price || 1,
    cashier_id: sale?.cashier_id || '',
    sale_date: sale?.sale_date ? sale.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL}/product`);
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (formData.product_id) {
      const selectedProduct = products.find(p => p.product_id === formData.product_id);
      if (selectedProduct?.unit_price) {
        setFormData(prev => ({
          ...prev,
          unit_price: selectedProduct.unit_price,
        }));
      }
    }
  }, [formData.product_id, products]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'unit_price' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        product_id: formData.product_id,
        quantity: formData.quantity,
        unit_price: formData.unit_price,
        cashier_id: formData.cashier_id,
        sale_date: formData.sale_date,
      };

      if (sale) {
        await axios.put(`${URL}/sale/${sale.id}`, {
          ...payload,
          id: sale.id
        });
      } else {
        await axios.post(`${URL}/sale`, payload);
      }

      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save sale.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {sale ? 'Edit Sale' : 'Add New Sale'}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product
              </label>
              <select
                name="product_id"
                value={formData.product_id}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select a product</option>
                {products.map(product => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.product_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Unit Price
              </label>
              <input
                type="number"
                name="unit_price"
                min="1"
                step="0.01"
                value={formData.unit_price}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                name="sale_date"
                value={formData.sale_date}
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
                {loading ? 'Saving...' : 'Save Sale'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
