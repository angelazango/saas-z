'use client';

import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  fetchSessionMaterialsStart,
  fetchSessionMaterialsSuccess,
  fetchSessionMaterialsFailure,
  deleteSessionMaterialStart,
  deleteSessionMaterialSuccess,
  deleteSessionMaterialFailure,
} from '@/src/redux/blockSlice/sessionMaterialSlice';

import { URL } from '@/config';
import SessionMaterialForm from './new/page';

export default function SessionMaterialList() {
  const dispatch = useDispatch();
  const {
    sessionMaterials = [],  // default empty array to avoid undefined errors
    loading,
    error,
  } = useSelector((state) => state.sessionMaterial);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSessionMaterials();
  }, []);

  const fetchSessionMaterials = async () => {
  dispatch(fetchSessionMaterialsStart());
  try {
    const response = await axios.get(`${URL}/blocks/session/material`);
    
    // Ensure we're properly extracting the array from response
    const materials = response.data?.session_materials || [];
    console.log('Fetched materials:', materials); // Debug log
    
    dispatch(fetchSessionMaterialsSuccess(materials));
  } catch (err) {
    dispatch(
      fetchSessionMaterialsFailure(
        err.response?.data?.message || 'Failed to fetch material records.'
      )
    );
  }
};
  const handleAddSessionMaterial = () => {
    setShowForm(true);
  };

  const handleDeleteSessionMaterial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material record?')) return;

    dispatch(deleteSessionMaterialStart());
    try {
      await axios.delete(`${URL}/blocks/session/material/${id}`);
      dispatch(deleteSessionMaterialSuccess(id));
    } catch (err) {
      dispatch(
        deleteSessionMaterialFailure(
          err.response?.data?.message || 'Failed to delete material record.'
        )
      );
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchSessionMaterials();
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Material Usage Records</h2>
          <button
            onClick={handleAddSessionMaterial}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Record</span>
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading material records...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSessionMaterials}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sessionMaterials.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No material records found</h3>
            <p className="mb-6">Get started by recording your first material usage.</p>
            <button
              onClick={handleAddSessionMaterial}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Record Material Usage
            </button>
          </div>
        )}

        {/* Table with records */}
        {!loading && !error && sessionMaterials.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sessionMaterials.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.session}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.team_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.material_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.quantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.unit}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDeleteSessionMaterial(record.id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label="Delete record"
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
              <span className="text-sm text-gray-700">Total Records: {sessionMaterials.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <SessionMaterialForm onCancel={handleFormCancel} onSuccess={handleFormSuccess} />
      )}
    </div>
  );
}
