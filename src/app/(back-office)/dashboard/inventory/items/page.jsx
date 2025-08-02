'use client';

import { useState, useEffect } from 'react';
import { Trash2, Plus } from 'lucide-react';
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
  const { products = [], loading, error } = useSelector((state) => state.product);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch(fetchProductsStart());
    try {
      const response = await axios.get(`${URL}/product`);
      const productsData = response.data?.products || [];
      dispatch(fetchProductsSuccess(productsData));
    } catch (err) {
      dispatch(
        fetchProductsFailure(
          err.response?.data?.message || 'Failed to fetch products.'
        )
      );
    }
  };

  const handleAddProduct = () => setShowForm(true);
  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchProducts();
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    dispatch(deleteProductStart());
    try {
      await axios.delete(`${URL}/product/${productId}`);
      dispatch(deleteProductSuccess(productId));
    } catch (err) {
      dispatch(
        deleteProductFailure(
          err.response?.data?.message || 'Failed to delete product.'
        )
      );
    }
  };

  return (
    <div className="max-w-8xl ml-7 mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
          <button
            onClick={handleAddProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error State */}
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

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="mb-6">Get started by adding your first product.</p>
            <button
              onClick={handleAddProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Product
            </button>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && products.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity Left</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.product_id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.quantity_left}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button
                          onClick={() => handleDeleteProduct(product.product_id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label="Delete product"
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
        <ProductForm onCancel={handleFormCancel} onSuccess={handleFormSuccess} />
      )}
    </div>
  );
}