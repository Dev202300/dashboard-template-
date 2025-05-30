'use client';

import { useState } from 'react';
import { 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  TruckIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface Shipping {
  id: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  status: 'delivered' | 'in-transit' | 'processing' | 'failed';
  carrier: string;
  trackingNumber: string;
  estimatedDelivery: string;
  items: {
    name: string;
    quantity: number;
  }[];
  date: string;
}

const shipments: Shipping[] = [
  {
    id: 'SHP-001',
    orderId: 'ORD-001',
    customer: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567'
    },
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    status: 'delivered',
    carrier: 'FedEx',
    trackingNumber: 'FDX123456789',
    estimatedDelivery: '2024-03-15',
    items: [
      { name: 'Nike Air Max 270', quantity: 1 }
    ],
    date: '2024-03-13'
  },
  {
    id: 'SHP-002',
    orderId: 'ORD-002',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 234-5678'
    },
    address: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90001',
      country: 'USA'
    },
    status: 'in-transit',
    carrier: 'UPS',
    trackingNumber: 'UPS987654321',
    estimatedDelivery: '2024-03-16',
    items: [
      { name: 'Adidas Ultraboost 22', quantity: 1 }
    ],
    date: '2024-03-14'
  },
  {
    id: 'SHP-003',
    orderId: 'ORD-003',
    customer: {
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      phone: '+1 (555) 345-6789'
    },
    address: {
      street: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    status: 'processing',
    carrier: 'DHL',
    trackingNumber: 'DHL456789123',
    estimatedDelivery: '2024-03-17',
    items: [
      { name: 'Puma RS-X³ Puzzle', quantity: 1 }
    ],
    date: '2024-03-14'
  },
  {
    id: 'SHP-004',
    orderId: 'ORD-004',
    customer: {
      name: 'Emily Davis',
      email: 'emily.d@email.com',
      phone: '+1 (555) 456-7890'
    },
    address: {
      street: '321 Elm St',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      country: 'USA'
    },
    status: 'failed',
    carrier: 'USPS',
    trackingNumber: 'USPS789123456',
    estimatedDelivery: '2024-03-15',
    items: [
      { name: 'New Balance 574 Classic', quantity: 1 }
    ],
    date: '2024-03-13'
  }
];

const statusFilters = [
  { label: 'All Status', value: 'all' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'In Transit', value: 'in-transit' },
  { label: 'Processing', value: 'processing' },
  { label: 'Failed', value: 'failed' },
];

const carrierFilters = [
  { label: 'All Carriers', value: 'all' },
  { label: 'FedEx', value: 'FedEx' },
  { label: 'UPS', value: 'UPS' },
  { label: 'DHL', value: 'DHL' },
  { label: 'USPS', value: 'USPS' },
];

const getStatusColor = (status: Shipping['status']) => {
  switch (status) {
    case 'delivered':
      return 'text-green-600 bg-green-50';
    case 'in-transit':
      return 'text-blue-600 bg-blue-50';
    case 'processing':
      return 'text-yellow-600 bg-yellow-50';
    case 'failed':
      return 'text-red-600 bg-red-50';
  }
};

const getStatusIcon = (status: Shipping['status']) => {
  switch (status) {
    case 'delivered':
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    case 'in-transit':
      return <TruckIcon className="h-5 w-5 text-blue-600" />;
    case 'processing':
      return <ClockIcon className="h-5 w-5 text-yellow-600" />;
    case 'failed':
      return <XCircleIcon className="h-5 w-5 text-red-600" />;
  }
};

export default function ShippingPage() {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedCarrierFilter, setSelectedCarrierFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredShipments = shipments.filter(shipment => {
    const matchesStatus = selectedStatusFilter === 'all' || shipment.status === selectedStatusFilter;
    const matchesCarrier = selectedCarrierFilter === 'all' || shipment.carrier === selectedCarrierFilter;
    const matchesSearch = shipment.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCarrier && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Shipping</h1>
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
                placeholder="Search shipments..."
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
                  value={selectedCarrierFilter}
                  onChange={(e) => setSelectedCarrierFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors"
                >
                  {carrierFilters.map((filter) => (
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

        {/* Shipments List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredShipments.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(shipment.status)}
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{shipment.customer.name}</h3>
                      <p className="text-sm text-gray-500">Order #{shipment.orderId}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace('-', ' ').charAt(0).toUpperCase() + shipment.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPinIcon className="h-5 w-5" />
                      <span>Shipping Address</span>
                    </div>
                    <p className="text-sm text-gray-900">
                      {shipment.address.street}<br />
                      {shipment.address.city}, {shipment.address.state} {shipment.address.zipCode}<br />
                      {shipment.address.country}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TruckIcon className="h-5 w-5" />
                      <span>Shipping Details</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      <p>Carrier: {shipment.carrier}</p>
                      <p>Tracking: {shipment.trackingNumber}</p>
                      <p>Est. Delivery: {new Date(shipment.estimatedDelivery).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <EnvelopeIcon className="h-5 w-5" />
                      <span>Contact Info</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      <p>{shipment.customer.email}</p>
                      <p>{shipment.customer.phone}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TruckIcon className="h-5 w-5" />
                      <span>Items</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      {shipment.items.map((item, index) => (
                        <p key={index}>
                          {item.quantity}x {item.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 