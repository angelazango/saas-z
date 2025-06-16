'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchCatalogStart,
  fetchCatalogSuccess,
  fetchCatalogFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from '@/src/redux/slice/catalogSlice';
import { URL } from '@/config';
import ProductForm from './new/page';
// import ProductForm from './ProductForm';

export default function CatalogList() {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector((state) => state.catalog);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      dispatch(fetchCatalogStart());
      const response = await axios.get(`${URL}/catalog`);
      dispatch(fetchCatalogSuccess(response.data.catalog));
    } catch (err) {
      dispatch(fetchCatalogFailure(err.response?.data?.message || 'Failed to fetch catalog.'));
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        dispatch(deleteProductStart());
        await axios.delete(`${URL}/catalog/${productId}`);
        dispatch(deleteProductSuccess(productId));
      } catch (err) {
        dispatch(deleteProductFailure(err.response?.data?.message || 'Failed to delete product.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchCatalog();
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Product Catalog</h2>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Product</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchCatalog}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && catalog.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first product.</p>
            <button
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Product
            </button>
          </div>
        )}

        {!loading && !error && catalog.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {catalog.map((product) => (
                  <tr key={product.product_id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{product.product_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${product.unit_price.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.product_id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="p-4 border-t bg-gray-50 text-center">
          <span className="text-sm text-gray-700">Total Products: {catalog.length}</span>
        </div>
      </div>

      {showForm && (
        <ProductForm 
          product={editingProduct} 
          onCancel={handleFormCancel} 
          onSuccess={handleFormSuccess} 
        />
      )}
    </div>
  );
}