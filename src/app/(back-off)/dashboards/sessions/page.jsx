'use client';
import { useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  fetchSessionsStart,
  fetchSessionsSuccess,
  fetchSessionsFailure,
  deleteSessionStart,
  deleteSessionSuccess,
  deleteSessionFailure,
} from '@/src/redux/blockSlice/sessionSlice';


import { URL } from '@/config';
import SessionForm from './new/page';

export default function SessionList() {
  const dispatch = useDispatch();
  const { sessions, loading, error } = useSelector((state) => state.session);
  const [showForm, setShowForm] = useState(false);
  const [editingSession, setEditingSession] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      dispatch(fetchSessionsStart());
      const response = await axios.get(`${URL}/blocks/session`);
      dispatch(fetchSessionsSuccess(response.data.sessions || []));
    } catch (err) {
      dispatch(fetchSessionsFailure(err.response?.data?.message || 'Failed to fetch sessions.'));
    }
  };

  const handleAddSession = () => {
    setEditingSession(null);
    setShowForm(true);
  };

  const handleEditSession = (session) => {
    setEditingSession(session);
    setShowForm(true);
  };

  const handleDeleteSession = async (sessionId) => {
    if (window.confirm('Are you sure you want to delete this session?')) {
      try {
        dispatch(deleteSessionStart());
        await axios.delete(`${URL}/blocks/session/${sessionId}`);
        dispatch(deleteSessionSuccess(sessionId));
      } catch (err) {
        dispatch(deleteSessionFailure(err.response?.data?.message || 'Failed to delete session.'));
      }
    }
  };

  const handleFormCancel = () => setShowForm(false);
  const handleFormSuccess = () => {
    setShowForm(false);
    fetchSessions();
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Sessions</h2>
          <button
            onClick={handleAddSession}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Session</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading sessions...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchSessions}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && sessions.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No sessions found</h3>
            <p className="text-gray-500 mb-6">Get started by creating your first session.</p>
            <button
              onClick={handleAddSession}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Create Your First Session
            </button>
          </div>
        )}

        {!loading && !error && sessions.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sessions.map((session) => (
                    <tr key={session.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{session.session}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-500">{session.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                        {/* <button
                          onClick={() => handleEditSession(session)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteSession(session.id)}
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
              <span className="text-sm text-gray-700">Total Sessions: {sessions.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <SessionForm
          session={editingSession}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}