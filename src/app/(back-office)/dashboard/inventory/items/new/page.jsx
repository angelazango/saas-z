'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createProductStart,
  createProductSuccess,
  createProductFailure,
} from '@/src/redux/blockSlice/productSlice';
import { URL } from '@/config';

export default function ProductForm({ onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    product_name: '',
    category_id: '',
    quantity_left: 0,
  });
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL}/category`);
        console.log('=== CATEGORIES DEBUG ===');
        console.log('Full response:', response.data);
        console.log('Categories array:', response.data?.categories);
        console.log('First category structure:', response.data?.categories?.[0]);
        console.log('========================');
        setCategories(response.data?.categories || []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError('Failed to load categories');
      }
    };
    fetchCategories();
  }, []);

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

    console.log('=== FORM SUBMIT DEBUG ===');
    console.log('Form data being sent:', formData);
    console.log('Selected category ID:', formData.category_id);
    console.log('Selected category ID type:', typeof formData.category_id);
    console.log('========================');

    try {
      dispatch(createProductStart());
      
      const requestData = {
        product_name: formData.product_name,
        category_id: formData.category_id,
        quantity_left: formData.quantity_left
      };
      
      console.log('Request payload:', requestData);
      
      const response = await axios.post(`${URL}/product`, requestData);
      
      dispatch(createProductSuccess(response.data));
      onSuccess();
    } catch (err) {
      console.log('=== ERROR DEBUG ===');
      console.log('Full error:', err);
      console.log('Error response:', err.response?.data);
      console.log('==================');
      
      const errorMessage = err.response?.data?.message || 'Failed to create product';
      setError(errorMessage);
      dispatch(createProductFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Product</h2>
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category *</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category, index) => (
                <option 
                  key={category.category_id || category.id || index}
                  value={category.category_id || category.id}
                >
                  {category.category_name || category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Initial Quantity *</label>
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
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}