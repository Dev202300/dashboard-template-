'use client';

import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  ChartBarIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const data = [
  { name: 'Jan', value: 400, users: 240, revenue: 2400 },
  { name: 'Feb', value: 300, users: 139, revenue: 2210 },
  { name: 'Mar', value: 200, users: 980, revenue: 2290 },
  { name: 'Apr', value: 278, users: 390, revenue: 2000 },
  { name: 'May', value: 189, users: 480, revenue: 2181 },
  { name: 'Jun', value: 239, users: 380, revenue: 2500 },
];

const metrics = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Active Users',
    value: '2,338',
    change: '+15.3%',
    icon: UsersIcon,
  },
  {
    name: 'Conversion Rate',
    value: '3.2%',
    change: '+4.75%',
    icon: ChartBarIcon,
  },
  {
    name: 'Growth Rate',
    value: '12.5%',
    change: '+2.02%',
    icon: ArrowTrendingUpIcon,
  },
];

// Time-based data for different periods
const timeBasedData = {
  'This week': {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    newUsers: [65, 59, 80, 81, 56, 55, 40],
    activeUsers: [28, 48, 40, 19, 86, 27, 90],
    returningUsers: [15, 25, 20, 10, 30, 15, 20],
  },
  'Last week': {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    newUsers: [45, 49, 60, 71, 46, 45, 30],
    activeUsers: [18, 38, 30, 29, 66, 17, 70],
    returningUsers: [25, 35, 30, 20, 40, 25, 30],
  },
  'This month': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    newUsers: [280, 320, 290, 310],
    activeUsers: [120, 140, 130, 150],
    returningUsers: [80, 90, 85, 95],
  },
  'Last month': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    newUsers: [250, 290, 270, 300],
    activeUsers: [110, 130, 120, 140],
    returningUsers: [70, 80, 75, 85],
  },
};

export default function AnalyticsPage() {
  const [timeFilter, setTimeFilter] = useState('This week');

  const chartData = {
    labels: timeBasedData[timeFilter as keyof typeof timeBasedData].labels,
    datasets: [
      {
        label: 'New Users',
        data: timeBasedData[timeFilter as keyof typeof timeBasedData].newUsers,
        backgroundColor: '#ffffff',
        borderColor: '#bde8e9',
        borderWidth: 2,
      },
      {
        label: 'Active Users',
        data: timeBasedData[timeFilter as keyof typeof timeBasedData].activeUsers,
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderWidth: 2,
      },
      {
        label: 'Returning Users',
        data: timeBasedData[timeFilter as keyof typeof timeBasedData].returningUsers,
        backgroundColor: '#bde8e9',
        borderColor: '#bde8e9',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {metrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium mb-2">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <metric.icon className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-green-600">
                {metric.change}
              </span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Area Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-gray-500 text-sm font-medium mb-4">Revenue Overview</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    fill="#93C5FD"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Growth Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-gray-500 text-sm font-medium">User Growth</h2>
              <div className="relative">
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#bde8e9]"
                >
                  <option>This week</option>
                  <option>Last week</option>
                  <option>This month</option>
                  <option>Last month</option>
                </select>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.labels.map((label, index) => ({
                  name: label,
                  'New Users': chartData.datasets[0].data[index],
                  'Active Users': chartData.datasets[1].data[index],
                  'Returning Users': chartData.datasets[2].data[index],
                }))}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.5rem',
                      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
                    }}
                  />
                  <Bar dataKey="New Users" fill="#ffffff" stroke="#bde8e9" strokeWidth={2} />
                  <Bar dataKey="Active Users" fill="#000000" />
                  <Bar dataKey="Returning Users" fill="#bde8e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 