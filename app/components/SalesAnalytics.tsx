'use client';

import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ChevronDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const countries = [
  { name: 'United States', percentage: 50 },
  { name: 'India', percentage: 20 },
  { name: 'UK', percentage: 10 },
  { name: 'Canada', percentage: 50 },
];

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6',
      },
    },
  },
};

// Time-based data for different periods
const timeBasedData = {
  'This week': {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    sold: [65, 59, 80, 81, 56, 55, 40],
    returned: [28, 48, 40, 19, 86, 27, 90],
    likely: [15, 25, 20, 10, 30, 15, 20],
  },
  'Last week': {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    sold: [45, 49, 60, 71, 46, 45, 30],
    returned: [18, 38, 30, 29, 66, 17, 70],
    likely: [25, 35, 30, 20, 40, 25, 30],
  },
  'This month': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    sold: [280, 320, 290, 310],
    returned: [120, 140, 130, 150],
    likely: [80, 90, 85, 95],
  },
  'Last month': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    sold: [250, 290, 270, 300],
    returned: [110, 130, 120, 140],
    likely: [70, 80, 75, 85],
  },
};

const createPattern = (color: string) => {
  const pattern = document.createElement('canvas');
  const ctx = pattern.getContext('2d');
  if (ctx) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 10, 10);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 5, 5);
    ctx.fillRect(5, 5, 5, 5);
  }
  return pattern;
};

export default function SalesAnalytics() {
  const [timeFilter, setTimeFilter] = useState('This week');

  const chartData = {
    labels: timeBasedData[timeFilter as keyof typeof timeBasedData].labels,
    datasets: [
      {
        label: 'Product Sold',
        data: timeBasedData[timeFilter as keyof typeof timeBasedData].sold,
        backgroundColor: '#ffffff',
        borderColor: '#bde8e9',
        borderWidth: 2,
      },
      {
        label: 'Product Return',
        data: timeBasedData[timeFilter as keyof typeof timeBasedData].returned,
        backgroundColor: '#000000',
        borderColor: '#000000',
        borderWidth: 2,
      },
      {
        label: 'Likely Returns',
        data: timeBasedData[timeFilter as keyof typeof timeBasedData].likely,
        backgroundColor: (context: any) => {
          const pattern = createPattern('#bde8e9');
          return context.chart.ctx.createPattern(pattern, 'repeat');
        },
        borderColor: '#bde8e9',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Top Selling by Country */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-800">Top Selling by Country</h2>
          <div className="text-xs text-gray-500">Total Sales</div>
        </div>
        <div className="space-y-5">
          {countries.map((country) => (
            <div key={country.name} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    {country.name}
                  </span>
                </div>
                <span className="text-sm font-semibold text-indigo-600">{country.percentage}%</span>
              </div>
              <div className="relative h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${country.percentage}%` }}
                />
                <div 
                  className="absolute top-0 h-full bg-gray-200 rounded-full transition-all duration-500 ease-out"
                  style={{ 
                    width: `${100 - country.percentage}%`,
                    left: `${country.percentage}%`,
                    backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6, #f3f4f6 4px, #e5e7eb 4px, #e5e7eb 8px)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Selling Chart */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Product Selling Chart</h2>
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
            <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <div className="h-[300px]">
          <Bar options={chartOptions} data={chartData} />
        </div>
      </div>
    </div>
  );
} 