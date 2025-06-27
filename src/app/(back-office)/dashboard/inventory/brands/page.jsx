'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import {
  fetchVendorsStart,
  fetchVendorsSuccess,
  fetchVendorsFailure,
} from '@/src/redux/slice/vendorSlice';



// import { fetchVendorsFailure } from '@/src/redux/slice/vendorSlice';


import { URL } from '@/config';
import VendorForm from './new/page';


export default function VendorList() {
  const dispatch = useDispatch();
  const { vendors, loading, error } = useSelector((state) => state.vendor);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      dispatch(fetchVendorsStart());
      const response = await axios.get(`${URL}/vendor`);
      dispatch(fetchVendorsSuccess(response.data.vendors));
    } catch (err) {
      dispatch(fetchVendorsFailure(err.response?.data?.message || 'Failed to fetch vendors.'));
    }
  };

  const handleAddVendor = () => setShowForm(true);
  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchVendors(); // Refresh list
  };

  return (
    <div className="max-w-9xl mx-auto  p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Vendors List</h2>
          <button
            onClick={handleAddVendor}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Vendor</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading vendors...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchVendors}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && vendors.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No vendors found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first vendor.</p>
            <button
              onClick={handleAddVendor}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Vendor
            </button>s
          </div>
        )}

        {!loading && !error && vendors.length > 0 && (
          <>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {vendors.map((vendor) => (
                <div key={vendor.id} className="bg-gray-50 rounded-lg p-6 border">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-xl text-gray-900 truncate">
                      {vendor.vendor_name}
                    </h3>
                    <div className="flex space-x-2 ml-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{vendor.description || 'No description provided'}</p>
                  <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                    Active
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50 text-center">
              <span className="text-sm text-gray-700">Total Vendors: {vendors.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <VendorForm onCancel={handleFormCancel} onSuccess={handleFormSuccess} />
      )}
    </div>
  );
}