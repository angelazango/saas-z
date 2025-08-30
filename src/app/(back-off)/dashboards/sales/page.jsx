'use client';
import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import {
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
  deleteSaleStart,
  deleteSaleSuccess,
  deleteSaleFailure,
} from '@/src/redux/blockSlice/saleSlice';


import { URL } from '@/config';
import SaleForm from './new/page';

export default function SaleList() {
  const dispatch = useDispatch();
  const { sales, loading, error } = useSelector((state) => state.sale);
  const [showForm, setShowForm] = useState(false);
  const [editingSale, setEditingSale] = useState(null);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      dispatch(fetchSalesStart());
      const response = await axios.get(`${URL}/blocks/sale`);
      dispatch(fetchSalesSuccess(response.data.sales || []));
    } catch (err) {
      dispatch(fetchSalesFailure(err.response?.data?.message || 'Failed to fetch sales.'));
    }
  };

  const handleAddSale = () => {
    setEditingSale(null);
    setShowForm(true);
  };

  const handleEditSale = (sale) => {
    setEditingSale(sale);
    setShowForm(true);
  };

  const handleDeleteSale = async (saleId) => {
    if (window.confirm('Are you sure you want to delete this sale?')) {
      try {
        dispatch(deleteSaleStart());
        await axios.delete(`${URL}/blocks/sale/${saleId}`);
        dispatch(deleteSaleSuccess(saleId));
      } catch (err) {
        dispatch(deleteSaleFailure(err.response?.data?.message || 'Failed to delete sale.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchSales();
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Block Sales</h2>
          <button
            onClick={handleAddSale}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Sale</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading sales...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSales}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && sales.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No sales found</h3>
            <p className="text-gray-500 mb-6">Get started by recording your first sale.</p>
            <button
              onClick={handleAddSale}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Record Your First Sale
            </button>
          </div>
        )}

        {!loading && !error && sales.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (XAF)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sale.product_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{sale.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{sale.selling_price.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{sale.sale_date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        {/* <button
                          onClick={() => handleEditSale(sale)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit className="w-5 h-5" />
                        </button> */}   
                        <button
                          onClick={() => handleDeleteSale(sale.id)}
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
              <span className="text-sm text-gray-700">Total Sales: {sales.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <SaleForm
          sale={editingSale}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}