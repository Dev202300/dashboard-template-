'use client';

import { ArrowRight } from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '$27,430',
    icon: ArrowRight,
  },
  {
    title: 'Total Customer',
    value: '1,226',
    icon: ArrowRight,
  },
  {
    title: 'Total Orders',
    value: '15,210',
    icon: ArrowRight,
  },
];

export default function StatsHeader() {
  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-gray-500 text-sm font-medium mb-2">
                {stat.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900">
                {stat.value}
              </p>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <stat.icon className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 