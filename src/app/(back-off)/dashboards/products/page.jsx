 'use client';
import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
} from '@/src/redux/blockSlice/productSlice';
import { URL } from '@/config';
import ProductForm from './new/page';

export default function ProductList() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      dispatch(fetchProductsStart());
      const response = await axios.get(`${URL}/blocks/product`);
      dispatch(fetchProductsSuccess(response.data.products || []));
    } catch (err) {
      dispatch(fetchProductsFailure(err.response?.data?.message || 'Failed to fetch products.'));
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
        await axios.delete(`${URL}/blocks/product/${productId}`);
        dispatch(deleteProductSuccess(productId));
      } catch (err) {
        dispatch(deleteProductFailure(err.response?.data?.message || 'Failed to delete product.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchProducts();
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Block Products</h2>
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
              onClick={fetchProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first block product.</p>
            <button
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Create Your First Product
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Left</th>
                    <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.product_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.quantity_left}</div>
                      </td>
                      <td className="px-5 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t bg-gray-50 text-center">
              <span className="text-sm text-gray-700">Total Products: {products.length}</span>
            </div>
          </>
        )}
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