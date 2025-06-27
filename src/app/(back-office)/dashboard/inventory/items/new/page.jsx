'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  createProductStart,
  createProductSuccess,
  createProductFailure,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} from '@/src/redux/slice/productSlice';
import { URL } from '@/config';

export default function ProductForm({ onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const { loading, error, categories } = useSelector((state) => state.product);

  const [productName, setProductName] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        dispatch(fetchCategoriesStart());
        const response = await axios.get(`${URL}/category`);
        dispatch(fetchCategoriesSuccess(response.data.categories));
      } catch (err) {
        dispatch(fetchCategoriesFailure(err.response?.data?.message || 'Failed to fetch categories.'));
      }
    };
    fetchCategories();
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched categories:", categories);
  }, [categories]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      alert('Please select a category');
      return;
    }

    const productData = {
      product_name: productName,
      category_id: selectedCategoryId, // Use string UUID directly
    };

    console.log("Submitting product data:", productData);

    try {
      dispatch(createProductStart());
      const response = await axios.post(`${URL}/product`, productData);
      dispatch(createProductSuccess(response.data));

      alert('Product created successfully!');
      setProductName('');
      setSelectedCategoryId('');

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Failed to create product:", err);
      dispatch(createProductFailure(err.response?.data?.message || 'Failed to create product.'));
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Product</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>
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
              {loading ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}