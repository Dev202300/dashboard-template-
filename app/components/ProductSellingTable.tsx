'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  image: string;
  stock: number;
  sold: number;
  price: number;
}

// Time-based product data
const timeBasedProducts = {
  'this-month': [
    {
      id: 1,
      name: 'Converse Chuck Taylor',
      image: 'https://i.pravatar.cc/150?img=1',
      stock: 100,
      sold: 1298,
      price: 90,
    },
    {
      id: 2,
      name: 'Air Jordan 1',
      image: 'https://i.pravatar.cc/150?img=2',
      stock: 50,
      sold: 65,
      price: 140,
    },
    {
      id: 3,
      name: 'New Balance 530',
      image: 'https://i.pravatar.cc/150?img=3',
      stock: 75,
      sold: 320,
      price: 110,
    },
  ],
  'last-month': [
    {
      id: 1,
      name: 'Converse Chuck Taylor',
      image: 'https://i.pravatar.cc/150?img=1',
      stock: 150,
      sold: 980,
      price: 90,
    },
    {
      id: 2,
      name: 'Air Jordan 1',
      image: 'https://i.pravatar.cc/150?img=2',
      stock: 80,
      sold: 45,
      price: 140,
    },
    {
      id: 3,
      name: 'New Balance 530',
      image: 'https://i.pravatar.cc/150?img=3',
      stock: 100,
      sold: 280,
      price: 110,
    },
  ],
  'this-year': [
    {
      id: 1,
      name: 'Converse Chuck Taylor',
      image: 'https://i.pravatar.cc/150?img=1',
      stock: 1200,
      sold: 15800,
      price: 90,
    },
    {
      id: 2,
      name: 'Air Jordan 1',
      image: 'https://i.pravatar.cc/150?img=2',
      stock: 800,
      sold: 720,
      price: 140,
    },
    {
      id: 3,
      name: 'New Balance 530',
      image: 'https://i.pravatar.cc/150?img=3',
      stock: 950,
      sold: 3800,
      price: 110,
    },
  ],
};

const timeFilters = [
  { label: 'This month', value: 'this-month' },
  { label: 'Last month', value: 'last-month' },
  { label: 'This year', value: 'this-year' },
];

export default function ProductSellingTable() {
  const [selectedFilter, setSelectedFilter] = useState('this-month');

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Product Selling</h2>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50 relative"
          >
            {timeFilters.map((filter) => (
              <option key={filter.value} value={filter.value}>
                {filter.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sold
              </th>
              <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeBasedProducts[selectedFilter as keyof typeof timeBasedProducts].map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 relative flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock} in stock</div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.sold} sold</div>
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 