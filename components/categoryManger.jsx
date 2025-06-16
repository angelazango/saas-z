'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/categoryApi';
import {
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  createCategoryStart,
  createCategorySuccess,
  createCategoryFailure,
  updateCategoryStart,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategoryStart,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from '@/src/redux/slice/categorySlice';

export default function CategoryManager() {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryForm, setCategoryForm] = useState({ name: '' });

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      dispatch(fetchCategoriesStart());
      try {
        const categories = await fetchCategories();
        dispatch(fetchCategoriesSuccess(categories));
      } catch (error) {
        dispatch(fetchCategoriesFailure(error.toString()));
      }
    };
    loadCategories();
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateCategory = async () => {
    if (!categoryForm.name.trim()) return;
    
    dispatch(createCategoryStart());
    try {
      const newCategory = await createCategory({ name: categoryForm.name });
      dispatch(createCategorySuccess(newCategory));
      setCategoryForm({ name: '' });
    } catch (error) {
      dispatch(createCategoryFailure(error.toString()));
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategory || !categoryForm.name.trim()) return;
    
    dispatch(updateCategoryStart());
    try {
      const updatedCategory = await updateCategory(editingCategory.id, { 
        name: categoryForm.name 
      });
      dispatch(updateCategorySuccess(updatedCategory));
      setEditingCategory(null);
      setCategoryForm({ name: '' });
    } catch (error) {
      dispatch(updateCategoryFailure(error.toString()));
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    dispatch(deleteCategoryStart());
    try {
      await deleteCategory(id);
      dispatch(deleteCategorySuccess(id));
    } catch (error) {
      dispatch(deleteCategoryFailure(error.toString()));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      
      {/* Category Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-3">
          {editingCategory ? 'Edit Category' : 'Add New Category'}
        </h2>
        <div className="flex gap-3">
          <input
            type="text"
            name="name"
            value={categoryForm.name}
            onChange={handleInputChange}
            placeholder="Category name"
            className="flex-1 border p-2 rounded"
          />
          {editingCategory ? (
            <>
              <button
                onClick={handleUpdateCategory}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
              <button
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryForm({ name: '' });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={handleCreateCategory}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && !categories.length ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center">
                  Loading categories...
                </td>
              </tr>
            ) : error && !categories.length ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-red-500">
                  {error}
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="2" className="px-6 py-4 text-center text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {category.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      ID: {category.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => {
                        setEditingCategory(category);
                        setCategoryForm({ name: category.name });
                      }}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}