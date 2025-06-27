'use client';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createMaterialStart,
  createMaterialSuccess,
  createMaterialFailure,
  updateMaterialStart,
  updateMaterialSuccess,
  updateMaterialFailure,
} from '@/src/redux/blockSlice/materialSlice';

import { URL } from '@/config';

export default function MaterialForm({ material, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    material_name: '',
    unit: 'bags',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (material) {
      setFormData({
        material_name: material.material_name,
        unit: material.unit,
        description: material.description || '',
      });
    }
  }, [material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      if (material) {
        // Update existing material
        dispatch(updateMaterialStart());
        const response = await axios.put(
          `${URL}/blocks/material/${material.id}`,
          formData
        );
        dispatch(updateMaterialSuccess(response.data));
      } else {
        // Add new material
        dispatch(createMaterialStart());
        const response = await axios.post(`${URL}/blocks/material`, formData);
        dispatch(createMaterialSuccess(response.data));
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (material ? 'Failed to update material.' : 'Failed to create material.');
      setError(errorMessage);
      dispatch(material ? updateMaterialFailure(errorMessage) : createMaterialFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {material ? 'Edit Material' : 'Add New Material'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Material Name *</label>
            <input
              type="text"
              name="material_name"
              value={formData.material_name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
              minLength="2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit *</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="bags">Bags</option>
              <option value="pieces">Pieces</option>
              <option value="kg">Kilograms</option>
              <option value="liters">Liters</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (material ? 'Updating...' : 'Creating...') 
                : (material ? 'Update Material' : 'Create Material')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}