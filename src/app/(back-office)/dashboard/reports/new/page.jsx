'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '@/config';
import { format, parse } from 'date-fns';

export default function PurchaseForm({ purchase, onCancel, onSuccess }) {
  const [formData, setFormData] = useState({
    product_id: purchase?.product_id || '',
    quantity: purchase?.quantity || 1,
    total_price: purchase?.total_price || 0,
    purchase_date: purchase?.purchase_date
      ? format(parse(purchase.purchase_date, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd')
      : format(new Date(), 'yyyy-MM-dd'),
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'total_price' ? 
        parseFloat(value) || 0 : 
        value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        purchase_date: format(parse(formData.purchase_date, 'yyyy-MM-dd', new Date()), 'dd-MM-yyyy'),
      };

      if (purchase?.id) {
        await axios.put(`${URL}/purchase/${purchase.id}`, payload);
      } else {
        await axios.post(`${URL}/purchase`, payload);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save purchase.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {purchase ? 'Edit Purchase' : 'Add New Purchase'}
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

            <div className="grid grid-cols-2 gap-4">
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
                  Total Price (XAF)
                </label>
                <input
                  type="number"
                  name="total_price"
                  min="0"
                  step="1"
                  value={formData.total_price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Purchase Date
              </label>
              <input
                type="date"
                name="purchase_date"
                value={formData.purchase_date}
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
                {loading ? 'Saving...' : 'Save Purchase'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}