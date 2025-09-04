'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from '@/src/redux/slice/categorySlice';
import { URL } from '@/config';
import CategoryForm from './new/page';

export default function CategoryList() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      dispatch(fetchCategoriesStart());
      const response = await axios.get(`${URL}/category`);
      dispatch(fetchCategoriesSuccess(response.data.categories || []));
    } catch (err) {
      dispatch(fetchCategoriesFailure(err.response?.data?.message || 'Failed to fetch categories.'));
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!categoryId) {
      alert('Invalid category ID');
      return;
    }
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        dispatch(deleteCategoryStart());
        await axios.delete(`${URL}/category/${categoryId}`);
        dispatch(deleteCategorySuccess(categoryId));
        fetchCategories(); // Refresh the list after deletion
      } catch (err) {
        dispatch(deleteCategoryFailure(err.response?.data?.message || 'Failed to delete category.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchCategories(); // Force refresh the list
  };

  return (
    <div className="max-w-8xl mx-auto  p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Categories List</h2>
          <button
            onClick={handleAddCategory}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Category</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading categories...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchCategories}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && categories.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first category.</p>
            <button
              onClick={handleAddCategory}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Category
            </button>
          </div>
        )}

        {!loading && !error && categories.length > 0 && (
          <>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-gray-50 rounded-lg p-6 border">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-xl text-gray-900 truncate">
                      {category.category_name}
                    </h3>
                    <div className="flex space-x-2 ml-2">
                      {/* <button
                        onClick={() => handleEditCategory(category)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Edit  v
                      </button> */}
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">
                    {category.category_description || 'No description provided'}
                  </p>
                  <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    Active
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50 text-center">
              <span className="text-sm text-gray-700">Total Categories: {categories.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <CategoryForm
          category={editingCategory}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}