'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createProductStart,
  createProductSuccess,
  createProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from '@/src/redux/blockSlice/productSlice';
import { URL } from '@/config';

export default function ProductForm({ product, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    product_name: '',
    description: '',
    quantity_left: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name,
        description: product.description || '',
        quantity_left: product.quantity_left || 0,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity_left' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (product) {
        dispatch(updateProductStart());
        const response = await axios.put(
          `${URL}/blocks/product/${product.id}`,
          formData
        );
        dispatch(updateProductSuccess(response.data));
      } else {
        dispatch(createProductStart());
        const response = await axios.post(`${URL}/blocks/product`, formData);
        dispatch(createProductSuccess(response.data));
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (product ? 'Failed to update product.' : 'Failed to create product.');
      setError(errorMessage);
      dispatch(product ? updateProductFailure(errorMessage) : createProductFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {product ? 'Edit Block Product' : 'Add New Block Product'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name *</label>
            <input
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., Block 3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="e.g., Used for raising houses"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity Left *</label>
            <input
              type="number"
              name="quantity_left"
              min="0"
              value={formData.quantity_left}
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
                ? (product ? 'Updating...' : 'Creating...') 
                : (product ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}