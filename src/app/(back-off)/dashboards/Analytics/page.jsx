"use client"

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Users, Package, DollarSign, Activity } from 'lucide-react';

// Card Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-2 ${className}`}>
    {children}
  </div> 
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-600 mt-1 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

// Sample Data
const sampleData = {
  kpis: {
    totalProduction: 125000,
    totalRevenue: 87500,
    activeTeams: 8,
    qualityRate: 96
  },
  productionData: [
    { date: 'Mon', bricks: 2400, target: 2500 },
    { date: 'Tue', bricks: 2600, target: 2500 },
    { date: 'Wed', bricks: 2200, target: 2500 },
    { date: 'Thu', bricks: 2800, target: 2500 },
    { date: 'Fri', bricks: 2500, target: 2500 },
    { date: 'Sat', bricks: 2300, target: 2500 },
    { date: 'Sun', bricks: 2100, target: 2500 }
  ],
  salesData: [
    { month: 'Jan', sales: 12000, revenue: 8400 },
    { month: 'Feb', sales: 15000, revenue: 10500 },
    { month: 'Mar', sales: 18000, revenue: 12600 },
    { month: 'Apr', sales: 16000, revenue: 11200 },
    { month: 'May', sales: 20000, revenue: 14000 },
    { month: 'Jun', sales: 22000, revenue: 15400 }
  ],
  sessions: [
    { id: 1, status: 'completed' },
    { id: 2, status: 'completed' },
    { id: 3, status: 'completed' },
    { id: 4, status: 'completed' },
    { id: 5, status: 'completed' },
    { id: 6, status: 'in_progress' },
    { id: 7, status: 'in_progress' },
    { id: 8, status: 'planned' },
    { id: 9, status: 'planned' },
    { id: 10, status: 'planned' }
  ]
};

export default function AdminDashboard() {
  const { kpis, productionData, salesData, sessions } = sampleData;

  const pieData = [
    { name: 'Completed', value: sessions.filter(s => s.status === 'completed').length, color: '#16a34a' },
    { name: 'In Progress', value: sessions.filter(s => s.status === 'in_progress').length, color: '#f97316' },
    { name: 'Planned', value: sessions.filter(s => s.status === 'planned').length, color: '#3b82f6' },
  ];

  const kpiCards = [
    {
      title: 'Total Production',
      value: kpis.totalProduction.toLocaleString(),
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: 'text-green-600',
    },
    {
      title: 'Total Revenue',
      value: `$${kpis.totalRevenue.toLocaleString()}`,
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Teams',
      value: kpis.activeTeams,
      change: '0%',
      trend: 'neutral',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      title: 'Quality Rate',
      value: `${kpis.qualityRate}%`,
      change: '+2%',
      trend: 'up',
      icon: Package,
      color: 'text-green-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
    
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Overview of brick production operations</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {kpiCards.map((kpi, index) => {
              const Icon = kpi.icon;
              const TrendIcon = kpi.trend === 'up' ? TrendingUp : kpi.trend === 'down' ? TrendingDown : null;
              
              return (
                <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {kpi.title}
                    </CardTitle>
                    <Icon className={`h-4 w-4 ${kpi.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
                    <div className="flex items-center text-xs text-gray-600 mt-1">
                      {TrendIcon && <TrendIcon className={`h-3 w-3 mr-1 ${kpi.color}`} />}
                      <span>{kpi.change} from last month</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Production Chart */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Daily Production</CardTitle>
                <CardDescription>Bricks produced vs target over the last week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Bar dataKey="bricks" fill="#3b82f6" name="Produced" radius={[2, 2, 0, 0]} />
                    <Bar dataKey="target" fill="#e5e7eb" name="Target" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Session Status */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Session Status</CardTitle>
                <CardDescription>Current status of production sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>


                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Sales Trend */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Sales Trend</CardTitle>
                <CardDescription>Monthly sales and revenue performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="#3b82f6" 
                      name="Sales (units)" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#16a34a" 
                      name="Revenue ($)" 
                      strokeWidth={2}
                      dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates across the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Session completed</p>
                      <p className="text-xs text-gray-500 truncate">Alpha Team - 2,500 bricks produced</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">2m ago</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">New sale recorded</p>
                      <p className="text-xs text-gray-500 truncate">XYZ Builders - $1,500</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">15m ago</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Low stock alert</p>
                      <p className="text-xs text-gray-500 truncate">Clay - 950kg remaining</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">1h ago</span>
                  </div>
                  <div className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Material received</p>
                      <p className="text-xs text-gray-500 truncate">Sand - 500kg delivered</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">3h ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>





          </div>
        </div>
      </div>
    </div>
  );
}