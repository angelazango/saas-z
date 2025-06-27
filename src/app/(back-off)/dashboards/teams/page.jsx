'use client';

import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchTeamsStart,
  fetchTeamsSuccess,
  fetchTeamsFailure,
  deleteTeamStart,
  deleteTeamSuccess,
  deleteTeamFailure,
} from '@/src/redux/blockSlice/teamSlice';
import { URL } from '@/config';
import TeamForm from './new/page';

export default function TeamList() {
  const dispatch = useDispatch();

  // ✅ Safe destructuring
  const teamState = useSelector((state) => state.team) || {};
  const teams = teamState.teams || [];
  const loading = teamState.loading;
  const error = teamState.error;

  const [showForm, setShowForm] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      dispatch(fetchTeamsStart());
      const response = await axios.get(`${URL}/blocks/team`);
      dispatch(fetchTeamsSuccess(response.data.teams || []));
    } catch (err) {
      dispatch(fetchTeamsFailure(err.response?.data?.message || 'Failed to fetch teams.'));
    }
  };

  const handleAddTeam = () => {
    setEditingTeam(null);
    setShowForm(true);
  };

  const handleEditTeam = (team) => {
    setEditingTeam(team);
    setShowForm(true);
  };

  const handleDeleteTeam = async (teamId) => {
    if (window.confirm('Are you sure you want to delete this team?')) {
      try {
        dispatch(deleteTeamStart());
        await axios.delete(`${URL}/blocks/team/${teamId}`);
        dispatch(deleteTeamSuccess(teamId));
      } catch (err) {
        dispatch(deleteTeamFailure(err.response?.data?.message || 'Failed to delete team.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchTeams();
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Teams</h2>
          <button
            onClick={handleAddTeam}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Team</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading teams...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchTeams}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && teams.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No teams found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first team.</p>
            <button
              onClick={handleAddTeam}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Create Your First Team
            </button>
          </div>
        )}

        {!loading && !error && teams.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teams.map((team) => (
                    <tr key={team.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{team.team_name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{team.phone_number}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{team.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          aria-label="Edit team"
                          onClick={() => handleEditTeam(team)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          aria-label="Delete team"
                          onClick={() => handleDeleteTeam(team.id)}
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
              <span className="text-sm text-gray-700">Total Teams: {teams.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <TeamForm
          team={editingTeam}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
