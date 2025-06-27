'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';


import {
  createVendorStart,
  createVendorSuccess,
  createVendorFailure,
} from '@/src/redux/slice/vendorSlice';


import { URL } from '@/config';

export default function VendorForm({ onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.vendor);

  const [vendorName, setVendorName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendorData = {
      vendor_name: vendorName,
      description: description,
    };

    try {
      dispatch(createVendorStart());
      const response = await axios.post(`${URL}/vendor`, vendorData);
      dispatch(createVendorSuccess(response.data));

      alert('Vendor created successfully!');
      setVendorName('');
      setDescription('');

      if (onSuccess) onSuccess();
    } catch (err) {
      dispatch(createVendorFailure(err.response?.data?.message || 'Failed to create vendor.'));
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg  flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Create New Vendor</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Vendor Name</label>
            <input
              type="text"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm">Error: {error}</p>}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 p-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Vendor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
