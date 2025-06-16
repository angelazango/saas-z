'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
} from '@/src/redux/slice/categorySlice';
import { URL } from '@/config';

export default function CategoryForm({ category, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    category_name: '',
    category_description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (category) {
      setFormData({
        category_name: category.category_name,
        category_description: category.category_description || '',
      });
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (category) {
        // Update existing category
        dispatch(updateCategoryStart());
        const response = await axios.put(
          `${URL}/category/${category.id}`,
          formData
        );
        dispatch(updateCategorySuccess(response.data));
      } else {
        // Add new category
        dispatch(createCategoryStart());
        const response = await axios.post(`${URL}/category`, formData);
        dispatch(createCategorySuccess(response.data));
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (category ? 'Failed to update category.' : 'Failed to create category.');
      setError(errorMessage);
      dispatch(category ? updateCategoryFailure(errorMessage) : createCategoryFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category Name *</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
              minLength="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="category_description"
              value={formData.category_description}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows="4"
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
                ? (category ? 'Updating...' : 'Creating...') 
                : (category ? 'Update Category' : 'Create Category')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}