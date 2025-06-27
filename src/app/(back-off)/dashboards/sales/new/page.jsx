'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';


import {
  createSaleStart,
  createSaleSuccess,
  createSaleFailure,
  updateSaleStart,
  updateSaleSuccess,
  updateSaleFailure,
} from '@/src/redux/blockSlice/saleSlice';

import { URL } from '@/config';

export default function SaleForm({ sale, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: 1,
    selling_price: 0,
    cashier_id: '',
  });
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (sale) {
      setFormData({
        product_id: sale.product_id,
        quantity: sale.quantity,
        selling_price: sale.selling_price,
        cashier_id: sale.cashier_id || '',
      });
    }
    // Fetch available products
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${URL}/blocks/product`);
        setProducts(response.data.products || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };
    fetchProducts();
  }, [sale]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'selling_price' ? 
        parseFloat(value) || 0 : 
        value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const payload = {
        product_id: formData.product_id,
        quantity: formData.quantity,
        selling_price: formData.selling_price,
        cashier_id: formData.cashier_id || null,
      };

      if (sale) {
        dispatch(updateSaleStart());
        const response = await axios.put(
          `${URL}/blocks/sale/${sale.id}`,
          payload
        );
        dispatch(updateSaleSuccess(response.data));
      } else {
        dispatch(createSaleStart());
        const response = await axios.post(`${URL}/blocks/sale`, payload);
        dispatch(createSaleSuccess(response.data));
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (sale ? 'Failed to update sale.' : 'Failed to create sale.');
      setError(errorMessage);
      dispatch(sale ? updateSaleFailure(errorMessage) : createSaleFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {sale ? 'Edit Sale' : 'Record New Sale'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product *</label>
            <select
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
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
            <label className="block text-sm font-medium mb-1">Selling Price (XAF) *</label>
            <input
              type="number"
              name="selling_price"
              min="0"
              step="1"
              value={formData.selling_price}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cashier ID (Optional)</label>
            <input
              type="text"
              name="cashier_id"
              value={formData.cashier_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Leave empty if not applicable"
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
                ? (sale ? 'Updating...' : 'Recording...') 
                : (sale ? 'Update Sale' : 'Record Sale')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}