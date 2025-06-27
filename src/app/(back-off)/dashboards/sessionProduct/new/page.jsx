'use client';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
  createSessionProductStart,
  createSessionProductSuccess,
  createSessionProductFailure,
} from '@/src/redux/blockSlice/sessionProductSlice';
import { URL } from '@/config';

export default function SessionProductForm({ onCancel, onSuccess }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    session_id: '',
    team_id: '',
    product_id: '',
    date: new Date().toISOString().split('T')[0],
    quantity: 1,
  });
  const [sessions, setSessions] = useState([]);
  const [teams, setTeams] = useState([]);
  const [products, setProducts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch sessions, teams, and products for dropdowns
    const fetchData = async () => {
      try {
        const [sessionsRes, teamsRes, productsRes] = await Promise.all([
          axios.get(`${URL}/blocks/session`),
          axios.get(`${URL}/blocks/team`),
          axios.get(`${URL}/blocks/product`),
        ]);
        setSessions(sessionsRes.data.sessions || []);
        setTeams(teamsRes.data.teams || []);
        setProducts(productsRes.data.products || []);
      } catch (err) {
        setError('Failed to load required data');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      dispatch(createSessionProductStart());
      const response = await axios.post(`${URL}/blocks/session/product`, formData);
      dispatch(createSessionProductSuccess(response.data));
      onSuccess();
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to record session product';
      setError(errorMessage);
      dispatch(createSessionProductFailure(errorMessage));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Record Session Production</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 text-xl font-bold">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Session *</label>
            <select
              name="session_id"
              value={formData.session_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {session.session}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Team *</label>
            <select
              name="team_id"
              value={formData.team_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Team</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.team_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Product *</label>
            <select
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.product_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Quantity *</label>
            <input
              type="number"
              name="quantity"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
              required
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
              {isSubmitting ? 'Recording...' : 'Record Production'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
