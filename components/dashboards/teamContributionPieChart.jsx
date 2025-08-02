// 'use client';

// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { useSelector } from 'react-redux';

// const COLORS = ['#6366F1', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// export default function TeamContributionPieChart() {
//   const sessionProducts = useSelector((state) => state.sessionProduct.sessionProducts || []);

//   // 📊 Summarize production quantity per team
//   const teamData = sessionProducts.reduce((acc, curr) => {
//     const team = curr.team_name || 'Unknown';
//     acc[team] = (acc[team] || 0) + Number(curr.quantity);
//     return acc;
//   }, {});

//   // 🔁 Convert object to array for recharts
//   const chartData = Object.entries(teamData).map(([name, value]) => ({
//     name,
//     value,
//   }));

//   // Custom tooltip component
//   const CustomTooltip = ({ active, payload }) => {
//     if (active && payload && payload.length) {
//       const data = payload[0];
//       const total = chartData.reduce((sum, item) => sum + item.value, 0);
//       const percentage = ((data.value / total) * 100).toFixed(1);
      
//       return (
//         <div className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl transform scale-105">
//           <div className="flex items-center gap-3 mb-2">
//             <div 
//               className="w-4 h-4 rounded-full shadow-lg"
//               style={{ backgroundColor: data.payload.fill }}
//             ></div>
//             <p className="text-white font-bold text-sm">{data.payload.name}</p>
//           </div>
//           <div className="space-y-1">
//             <p className="text-emerald-300 font-semibold text-lg flex items-center gap-2">
//               🏭 {data.value} units
//             </p>
//             <p className="text-cyan-300 font-medium text-sm">
//               📊 {percentage}% of total production
//             </p>
//           </div>
//         </div>
//       );
//     }
//     return null;
//   };

//   // Custom label component
//   const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
//     if (percent < 0.05) return null; // Hide labels for very small slices
    
//     const RADIAN = Math.PI / 180;
//     const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text 
//         x={x} 
//         y={y} 
//         fill="#374151" 
//         textAnchor={x > cx ? 'start' : 'end'} 
//         dominantBaseline="central"
//         className="font-bold text-sm drop-shadow-sm"
//       >
//         {`${name}: ${(percent * 100).toFixed(1)}%`}
//       </text>
//     );
//   };

//   return (
//     <div className="relative bg-gradient-to-br from-white via-slate-50/90 to-violet-50/40  rounded-3xl shadow-2xl overflow-hidden border border-white/40">
//       {/* Decorative background elements */}
//       <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-violet-100/60 to-indigo-100/40 rounded-full blur-3xl transform translate-x-24 -translate-y-24"></div>
//       <div className="absolute bottom-0 left-0 w-36 h-36 bg-gradient-to-tr from-cyan-100/50 to-emerald-100/30 rounded-full blur-2xl transform -translate-x-18 translate-y-18"></div>
      
//       {/* Floating geometric accents */}
//       <div className="absolute top-6 right-10 w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full animate-pulse"></div>
//       <div className="absolute top-12 right-16 w-1 h-1 bg-gradient-to-r from-indigo-400 to-cyan-500 rounded-full animate-pulse delay-500"></div>
//       <div className="absolute bottom-8 left-8 w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse delay-1000"></div>
      
//       {/* Stunning header */}
//       <div className="relative z-10 mb-8">
//         <div className="flex items-center gap-4 mb-3">
//           <div className="relative">
//             <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//               <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
//                 <div className="w-3 h-3 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full"></div>
//               </div>
//             </div>
//             <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r 
//             from-emerald-400 to-cyan-500 rounded-full animate-ping"></div>
//           </div>
//           <div>
//             <h2 className="text-3xl font-black bg-gradient-to-r from-slate-800 via-violet-700 
//             to-purple-700 bg-clip-text text-transparent">
//               Team Production Share
//             </h2>
//             <div className="flex items-center gap-2 mt-1">
//               <div className="w-2 h-2 bg-gradient-to-r from-violet-400 to-purple-500 rounded-full animate-pulse"></div>
//               <p className="text-slate-600 text-sm font-medium">Real-time contribution analytics</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Chart container */}
//       <div className="relative z-10">
//         {chartData.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-[350px] bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-inner">
//             <div className="w-20 h-20 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full flex items-center justify-center mb-4 shadow-inner">
//               <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-500 rounded-full flex items-center justify-center">
//                 <span className="text-white text-xl">📊</span>
//               </div>
//             </div>
//             <p className="text-slate-500 text-center font-medium text-lg">No production data available.</p>
//             <p className="text-slate-400 text-center text-sm mt-2">Data will appear once teams start producing</p>
//           </div>
//         ) : (
//           <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 p-6 shadow-inner">
//             <ResponsiveContainer width="100%" height={350}>
//               <PieChart>
//                 <defs>
//                   {/* Enhanced gradients for each slice */}
//                   {COLORS.map((color, index) => (
//                     <radialGradient key={`gradient-${index}`} id={`pieGradient-${index}`}>
//                       <stop offset="0%" stopColor={color} stopOpacity={0.9} />
//                       <stop offset="70%" stopColor={color} stopOpacity={0.7} />
//                       <stop offset="100%" stopColor={color} stopOpacity={0.5} />
//                     </radialGradient>
//                   ))}
//                 </defs>
                
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   label={CustomLabel}
//                   outerRadius={120}
//                   innerRadius={40}
//                   dataKey="value"
//                   stroke="#ffffff"
//                   strokeWidth={3}
//                   className="drop-shadow-lg"
//                 >
//                   {chartData.map((_, index) => (
//                     <Cell 
//                       key={`cell-${index}`} 
//                       fill={`url(#pieGradient-${index % COLORS.length})`}
//                       className="hover:opacity-80 transition-opacity duration-300"
//                     />
//                   ))}
//                 </Pie>
                
//                 <Tooltip content={<CustomTooltip />} />
                
//                 <Legend 
//                   layout="horizontal" 
//                   verticalAlign="bottom" 
//                   align="center"
//                   wrapperStyle={{
//                     paddingTop: '20px',
//                     fontSize: '14px',
//                     fontWeight: '600'
//                   }}
//                   iconType="circle"
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//           </div>
//         )}
//       </div>

//       {/* Stats footer */}
//       <div className="relative z-10 mt-6 flex justify-between items-center px-4">
//         <div className="flex items-center gap-3">
//           <div className="w-4 h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 rounded-full"></div>
//           <span className="text-slate-600 font-semibold text-sm">Team Analytics</span>
//         </div>
//         <div className="flex items-center gap-2 text-slate-500 text-xs">
//           <span className="font-medium">{chartData.length} active teams</span>
//           <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
//           <span className="font-medium">
//             {chartData.reduce((sum, item) => sum + item.value, 0)} total units
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#6366F1', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function TeamContributionPieChart() {
  const sessionProducts = useSelector((state) => state.sessionProduct.sessionProducts || []);

  // 📊 Summarize production quantity per team
  const teamData = sessionProducts.reduce((acc, curr) => {
    const team = curr.team_name || 'Unknown';
    acc[team] = (acc[team] || 0) + Number(curr.quantity);
    return acc;
  }, {});

  // 🔁 Convert object to array for recharts
  const chartData = Object.entries(teamData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Team Production</h2>
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