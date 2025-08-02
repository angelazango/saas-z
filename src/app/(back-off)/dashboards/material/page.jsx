'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchMaterialsStart,
  fetchMaterialsSuccess,
  fetchMaterialsFailure,
  deleteMaterialStart,
  deleteMaterialSuccess,
  deleteMaterialFailure,
} from  '@/src/redux/blockSlice/materialSlice';

import { URL } from '@/config';
import MaterialForm from './new/page';

export default function MaterialList() {
  const dispatch = useDispatch();
  const { materials, loading, error } = useSelector((state) => state.material);
  const [showForm, setShowForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      dispatch(fetchMaterialsStart());
      const response = await axios.get(`${URL}/blocks/material`);
      dispatch(fetchMaterialsSuccess(response.data.materials || []));
    } catch (err) {
      dispatch(fetchMaterialsFailure(err.response?.data?.message || 'Failed to fetch materials.'));
    }
  };

  const handleAddMaterial = () => {
    setEditingMaterial(null);
    setShowForm(true);
  };

  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setShowForm(true);
  };

  const handleDeleteMaterial = async (materialId) => {
    if (!materialId) {
      alert('Invalid material ID');
      return;
    }
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        dispatch(deleteMaterialStart());
        await axios.delete(`${URL}/blocks/material/${materialId}`);
        dispatch(deleteMaterialSuccess(materialId));
      } catch (err) {
        dispatch(deleteMaterialFailure(err.response?.data?.message || 'Failed to delete material.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchMaterials();
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Materials List</h2>
          <button
            onClick={handleAddMaterial}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Material</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading materials...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchMaterials}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && materials.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No materials found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first material.</p>
            <button
              onClick={handleAddMaterial}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Material
            </button>
          </div>
        )}

        {!loading && !error && materials.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {materials.map((material) => (
                    <tr key={material.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{material.material_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{material.unit}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{material.description}</div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap  text-sm font-medium">
                        <button
                          onClick={() => handleEditMaterial(material)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMaterial(material.id)}
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

            <div className="p-4 border-t bg-gray-50 text-center">
              <span className="text-sm text-gray-700">Total Materials: {materials.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <MaterialForm
          material={editingMaterial}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}