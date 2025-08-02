'use client';

import { useSelector } from 'react-redux';

export default function TeamKpiCards() {
  const teams = useSelector((state) => state.team.teams || []);

  return (
    <div className="grid grid-cols-1 gap-4 bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-gray-500 text-sm">Total Teams</h4>
          <p className="text-xl font-semibold text-gray-800">{teams.length}</p>
        </div>
      </div>
    </div>
  );
}
