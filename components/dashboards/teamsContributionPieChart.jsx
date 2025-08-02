'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#6366F1', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function TeamContributionPieChart() {
  const sessionProducts = useSelector((state) => state.sessionProduct.sessionProducts || []);

  const teamData = sessionProducts.reduce((acc, curr) => {
    const team = curr.team_name || 'Unknown';
    acc[team] = (acc[team] || 0) + Number(curr.quantity);
    return acc;
  }, {});

  const chartData = Object.entries(teamData).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Team performance</h2>
      {chartData.length === 0 ? (
        <p className="text-gray-500 text-center">No production data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={110}
              dataKey="value"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
