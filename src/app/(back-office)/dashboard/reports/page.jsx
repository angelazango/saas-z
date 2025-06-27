'use client';
import { useState, useEffect } from 'react';
import { Edit, PenBoxIcon, Trash2 } from 'lucide-react';

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchPurchasesStart,
  fetchPurchasesSuccess,
  fetchPurchasesFailure,
  deletePurchaseStart,
  deletePurchaseSuccess,
  deletePurchaseFailure,
} from '@/src/redux/slice/purchaseSlice';
import { URL } from '@/config';
import PurchaseForm from './new/page';

export default function PurchaseList() {
  const dispatch = useDispatch();
  const { purchases, loading, error } = useSelector((state) => state.purchase);
  const [showForm, setShowForm] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      dispatch(fetchPurchasesStart());
      const response = await axios.get(`${URL}/purchase`);
      dispatch(fetchPurchasesSuccess(response.data.purchases || []));
    } catch (err) {
      dispatch(fetchPurchasesFailure(err.response?.data?.message || 'Failed to fetch purchases.'));
    }
  };

  const handleAddPurchase = () => {
    setSelectedPurchase(null);
    setShowForm(true);
  };

  const handleEditPurchase = (purchase) => {
    setSelectedPurchase(purchase);
    setShowForm(true);
  };

  const handleDeletePurchase = async (purchaseId) => {
    if (window.confirm('Are you sure you want to delete this purchase?')) {
      try {
        dispatch(deletePurchaseStart());
        await axios.delete(`${URL}/purchase/${purchaseId}`);
        dispatch(deletePurchaseSuccess(purchaseId));
      } catch (err) {
        dispatch(deletePurchaseFailure(err.response?.data?.message || 'Failed to delete purchase.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchPurchases();
  };

  return (
    <div className="max-w-10xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Purchases List</h2>
          <button
            onClick={handleAddPurchase}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Purchase</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading purchases...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchPurchases}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && purchases.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No purchases found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first purchase.</p>
            <button
              onClick={handleAddPurchase}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Purchase
            </button>
          </div>
        )}

        {!loading && !error && purchases.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price (XAF)</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cashier</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchases.map((purchase) => (
                    <tr key={purchase.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {purchase.product_name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {purchase.quantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {purchase.total_price.toLocaleString()} XAF
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {purchase.cashier_id || 'N/A'}
                      </td> */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => handleEditPurchase(purchase)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                           <PenBoxIcon className="w-5 h-5" />
                        </button>
                        {/* <button
                          onClick={() => handleDeletePurchase(purchase.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                        
                          <Trash2 className="w-5 h-5" />
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t bg-gray-50 text-center">
              <span className="text-sm text-gray-700">Total Purchases: {purchases.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <PurchaseForm 
          purchase={selectedPurchase} 
          onCancel={handleFormCancel} 
          onSuccess={handleFormSuccess} 
        />
      )}
    </div>
  );
}