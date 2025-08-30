'use client';
import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchSessionProductsStart,
  fetchSessionProductsSuccess,
  fetchSessionProductsFailure,
  deleteSessionProductStart,
  deleteSessionProductSuccess,
  deleteSessionProductFailure,
} from '@/src/redux/blockSlice/sessionProductSlice';

import { URL } from '@/config';
import SessionProductForm from './new/page';

export default function SessionProductList() {
  const dispatch = useDispatch();
  const { sessionProducts = [], loading, error } = useSelector((state) => state.sessionProduct || {});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSessionProducts();
  }, []);

  const fetchSessionProducts = async () => {
    try {
      dispatch(fetchSessionProductsStart());
      const response = await axios.get(`${URL}/blocks/session/product`);
      dispatch(fetchSessionProductsSuccess(response.data.session_products || []));
    } catch (err) {
      dispatch(fetchSessionProductsFailure(err.response?.data?.message || 'Failed to fetch session products.'));
    }
  };

  const handleAddSessionProduct = () => {
    setShowForm(true);
  };

  // const handleDeleteSessionProduct = async (sessionProductId) => {
  //   if (window.confirm('Are you sure you want to delete this production record?')) {
  //     try {
  //       dispatch(deleteSessionProductStart());
  //       await axios.delete(`${URL}/blocks/session/product/${sessionProductId}`);
  //       dispatch(deleteSessionProductSuccess(sessionProductId));
  //     } catch (err) {
  //       dispatch(deleteSessionProductFailure(err.response?.data?.message || 'Failed to delete production record.'));
  //     }
  //   }
  // };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchSessionProducts();
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Product Records</h2>
          <button
            onClick={handleAddSessionProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Record</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading production records...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSessionProducts}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && sessionProducts.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No production records found</h3>
            <p className="text-gray-500 mb-6">Get started by recording your first product.</p>
            <button
              onClick={handleAddSessionProduct}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Record Production
            </button>
          </div>
        )}

        {!loading && !error && sessionProducts.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sessionProducts.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{record.session}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{record.team_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{record.product_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{record.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{record.production_date}</div>
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        <button
                          onClick={() => handleDeleteSessionProduct(record.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t bg-gray-50 text-center">
              <span className="text-sm text-gray-700">Total Records: {sessionProducts.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <SessionProductForm
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
