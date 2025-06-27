'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';


import {
  createSessionStart,
  createSessionSuccess,
  createSessionFailure,
  updateSessionStart,
  updateSessionSuccess,
  updateSessionFailure,
} from '@/src/redux/blockSlice/sessionSlice';


import { URL } from '@/config';

export default function SessionForm({ session, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    session: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (session) {
      setFormData({
        session: session.session,
        description: session.description || '',
      });
    }
  }, [session]);

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
      if (session) {
        dispatch(updateSessionStart());
        const response = await axios.put(
          `${URL}/blocks/session/${session.id}`,
          formData
        );
        dispatch(updateSessionSuccess(response.data));
      } else {
        dispatch(createSessionStart());
        const response = await axios.post(`${URL}/blocks/session`, formData);
        dispatch(createSessionSuccess(response.data));
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (session ? 'Failed to update session.' : 'Failed to create session.');
      setError(errorMessage);
      dispatch(session ? updateSessionFailure(errorMessage) : createSessionFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {session ? 'Edit Session' : 'Add New Session'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Session Name *</label>
            <input
              type="text"
              name="session"
              value={formData.session}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., 7am-5pm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="e.g., Morning hours"
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
                ? (session ? 'Updating...' : 'Creating...') 
                : (session ? 'Update Session' : 'Create Session')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}