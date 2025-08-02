'use client';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#3B82F6'];

export default function SessionTeamPieChart() {
  const { sessionProducts = [] } = useSelector((state) => state.sessionProduct || {});

  const teamData = sessionProducts.reduce((acc, rec) => {
    if (!acc[rec.team_name]) acc[rec.team_name] = 0;
    acc[rec.team_name] += rec.quantity;
    return acc;
  }, {});

  const data = Object.entries(teamData).map(([team, quantity]) => ({
    name: team,
    value: quantity,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Contribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
