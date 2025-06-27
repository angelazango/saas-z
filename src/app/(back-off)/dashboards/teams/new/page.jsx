'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createTeamStart,
  createTeamSuccess,
  createTeamFailure,
  updateTeamStart,
  updateTeamSuccess,
  updateTeamFailure,
} from '@/src/redux/blockSlice/teamSlice';


import { URL } from '@/config';

export default function TeamForm({ team, onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    team_name: '',
    phone_number: '',
    email: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (team) {
      setFormData({
        team_name: team.team_name,
        phone_number: team.phone_number,
        email: team.email,
      });
    }
  }, [team]);

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
      if (team) {
        dispatch(updateTeamStart());
        const response = await axios.put(
          `${URL}/blocks/team/${team.id}`,
          formData
        );
        dispatch(updateTeamSuccess(response.data));
      } else {
        dispatch(createTeamStart());
        const response = await axios.post(`${URL}/blocks/team`, formData);
        dispatch(createTeamSuccess(response.data));
      }
      
      if (onSuccess) onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
        (team ? 'Failed to update team.' : 'Failed to create team.');
      setError(errorMessage);
      dispatch(team ? updateTeamFailure(errorMessage) : createTeamFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {team ? 'Edit Team' : 'Add New Team'}
          </h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Team Name *</label>
            <input
              type="text"
              name="team_name"
              value={formData.team_name}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., Team A"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., 678091220"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
              placeholder="e.g., teamA@gmail.com"
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
                ? (team ? 'Updating...' : 'Creating...') 
                : (team ? 'Update Team' : 'Create Team')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}