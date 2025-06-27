'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '@/src/redux/slice/productSlice';
import Link from 'next/link';
import { URL } from '@/config';

export default function ProductList() {
  const dispatch = useDispatch();
  // Get products, loading state, and error from Redux store
  const { products, loading, error } = useSelector((state) => state.product);

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products from API
  const fetchProducts = async () => {
    try {
      dispatch(fetchProductsStart());
      const response = await axios.get(`${URL}/product`);
      dispatch(fetchProductsSuccess(response.data.products));
    } catch (err) {
      dispatch(fetchProductsFailure(err.response?.data?.message || 'Failed to fetch products.'));
    }
  };

  return (
    <div className="max-w-9xl mx-auto  p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Products List</h2>
          <Link href="/dashboard/inventory/items/new"

            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Product</span>
          </Link>
        </div>
 
        {/* Loading state */}
        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Error state */}
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

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first product.</p>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Product
            </button>
          </div>
        )}

        {/* Product list */}
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{product.product_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{product.category_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${product.quantity_left < 3 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {product.quantity_left}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
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
    </div>
  );
}