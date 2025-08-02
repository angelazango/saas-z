'use client';
import { useSelector } from 'react-redux';

export default function SessionKpiCards() {
  const { sessionProducts = [] } = useSelector((state) => state.sessionProduct || {});

  const totalQuantity = sessionProducts.reduce((sum, rec) => sum + rec.quantity, 0);
  const totalSessions = sessionProducts.length;
  const uniqueTeams = [...new Set(sessionProducts.map((rec) => rec.team_name))].length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm text-gray-500">Total Bricks Produced</h3>
        <p className="text-2xl font-bold text-gray-800">{totalQuantity.toLocaleString()}</p>
      </div> 
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm text-gray-500">Total Sessions</h3>
        <p className="text-2xl font-bold text-gray-800">{totalSessions}</p>
      </div>
      {/* <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-sm text-gray-500">Teams Involved</h3>
        <p className="text-2xl font-bold text-gray-800">{uniqueTeams}</p>
      </div> */}
    </div>
  );
}
