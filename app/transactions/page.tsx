'use client';

import { useState } from 'react';
import { 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CreditCardIcon,
  BanknotesIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  customer: string;
  amount: number;
  type: 'income' | 'expense';
  method: 'card' | 'cash';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  description: string;
}

const transactions: Transaction[] = [
  {
    id: 'TRX-001',
    customer: 'John Smith',
    amount: 150.00,
    type: 'income',
    method: 'card',
    status: 'completed',
    date: '2024-03-15',
    description: 'Nike Air Max 270 Purchase'
  },
  {
    id: 'TRX-002',
    customer: 'Sarah Johnson',
    amount: 180.00,
    type: 'income',
    method: 'cash',
    status: 'completed',
    date: '2024-03-15',
    description: 'Adidas Ultraboost 22 Purchase'
  },
  {
    id: 'TRX-003',
    customer: 'Michael Brown',
    amount: 110.00,
    type: 'income',
    method: 'card',
    status: 'pending',
    date: '2024-03-15',
    description: 'Puma RS-X³ Puzzle Purchase'
  },
  {
    id: 'TRX-004',
    customer: 'Emily Davis',
    amount: 95.00,
    type: 'income',
    method: 'card',
    status: 'failed',
    date: '2024-03-14',
    description: 'New Balance 574 Classic Purchase'
  },
  {
    id: 'TRX-005',
    customer: 'David Wilson',
    amount: 170.00,
    type: 'income',
    method: 'cash',
    status: 'completed',
    date: '2024-03-14',
    description: 'Nike Air Jordan 1 High Purchase'
  },
  {
    id: 'TRX-006',
    customer: 'Lisa Anderson',
    amount: 100.00,
    type: 'income',
    method: 'card',
    status: 'completed',
    date: '2024-03-14',
    description: 'Adidas Forum Low Purchase'
  },
  {
    id: 'TRX-007',
    customer: 'Robert Taylor',
    amount: 85.00,
    type: 'income',
    method: 'card',
    status: 'pending',
    date: '2024-03-13',
    description: 'Puma Future Rider Purchase'
  },
  {
    id: 'TRX-008',
    customer: 'Jennifer Martinez',
    amount: 100.00,
    type: 'income',
    method: 'cash',
    status: 'completed',
    date: '2024-03-13',
    description: 'New Balance 327 Purchase'
  }
];

const statusFilters = [
  { label: 'All Status', value: 'all' },
  { label: 'Completed', value: 'completed' },
  { label: 'Pending', value: 'pending' },
  { label: 'Failed', value: 'failed' },
];

const typeFilters = [
  { label: 'All Types', value: 'all' },
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
];

const getStatusColor = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-50';
    case 'pending':
      return 'text-yellow-600 bg-yellow-50';
    case 'failed':
      return 'text-red-600 bg-red-50';
  }
};

const getStatusIcon = (status: Transaction['status']) => {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    case 'pending':
      return <ClockIcon className="h-5 w-5 text-yellow-600" />;
    case 'failed':
      return <XCircleIcon className="h-5 w-5 text-red-600" />;
  }
};

const getMethodIcon = (method: Transaction['method']) => {
  switch (method) {
    case 'card':
      return <CreditCardIcon className="h-5 w-5 text-gray-400" />;
    case 'cash':
      return <BanknotesIcon className="h-5 w-5 text-gray-400" />;
  }
};

export default function TransactionsPage() {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = selectedStatusFilter === 'all' || transaction.status === selectedStatusFilter;
    const matchesType = selectedTypeFilter === 'all' || transaction.type === selectedTypeFilter;
    const matchesSearch = transaction.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" />
              </div>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-base font-medium text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors"
                >
                  {statusFilters.map((filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={selectedTypeFilter}
                  onChange={(e) => setSelectedTypeFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors"
                >
                  {typeFilters.map((filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{transaction.customer}</div>
                        <div className="text-sm text-gray-500">{transaction.description}</div>
                        <div className="text-xs text-gray-400">{transaction.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {transaction.type === 'income' ? (
                          <ArrowDownTrayIcon className="h-5 w-5 text-green-600 mr-2" />
                        ) : (
                          <ArrowUpTrayIcon className="h-5 w-5 text-red-600 mr-2" />
                        )}
                        <span className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        {getMethodIcon(transaction.method)}
                        <span className="ml-2 capitalize">{transaction.method}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(transaction.status)}
                        <span className={`ml-2 text-sm font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 