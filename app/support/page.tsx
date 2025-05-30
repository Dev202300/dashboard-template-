'use client';

import { useState } from 'react';
import { 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  PaperAirplaneIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface SupportTicket {
  id: string;
  customer: {
    name: string;
    email: string;
    avatar: string;
  };
  subject: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'shipping' | 'product';
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
  messages: {
    id: string;
    sender: string;
    content: string;
    timestamp: string;
    isStaff: boolean;
  }[];
}

const tickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    customer: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    subject: 'Order Not Received',
    description: 'I placed an order for Nike Air Max 270 on March 13th but haven\'t received any shipping confirmation yet.',
    status: 'open',
    priority: 'high',
    category: 'shipping',
    assignedTo: 'Sarah Wilson',
    createdAt: '2024-03-15T10:30:00',
    lastUpdated: '2024-03-15T10:30:00',
    messages: [
      {
        id: 'MSG-001',
        sender: 'John Smith',
        content: 'I placed an order for Nike Air Max 270 on March 13th but haven\'t received any shipping confirmation yet.',
        timestamp: '2024-03-15T10:30:00',
        isStaff: false
      }
    ]
  },
  {
    id: 'TKT-002',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    subject: 'Product Size Issue',
    description: 'The Adidas Ultraboost 22 I received is too small. Need to exchange for a larger size.',
    status: 'in-progress',
    priority: 'medium',
    category: 'product',
    assignedTo: 'Mike Brown',
    createdAt: '2024-03-14T15:45:00',
    lastUpdated: '2024-03-15T09:20:00',
    messages: [
      {
        id: 'MSG-002',
        sender: 'Sarah Johnson',
        content: 'The Adidas Ultraboost 22 I received is too small. Need to exchange for a larger size.',
        timestamp: '2024-03-14T15:45:00',
        isStaff: false
      },
      {
        id: 'MSG-003',
        sender: 'Mike Brown',
        content: 'I\'ll help you with the exchange process. Could you please provide your order number?',
        timestamp: '2024-03-15T09:20:00',
        isStaff: true
      }
    ]
  },
  {
    id: 'TKT-003',
    customer: {
      name: 'Michael Brown',
      email: 'michael.b@email.com',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    subject: 'Payment Failed',
    description: 'My payment for Puma RS-X³ Puzzle was declined. Need help with alternative payment method.',
    status: 'resolved',
    priority: 'high',
    category: 'billing',
    assignedTo: 'Lisa Anderson',
    createdAt: '2024-03-13T11:15:00',
    lastUpdated: '2024-03-14T16:30:00',
    messages: [
      {
        id: 'MSG-004',
        sender: 'Michael Brown',
        content: 'My payment for Puma RS-X³ Puzzle was declined. Need help with alternative payment method.',
        timestamp: '2024-03-13T11:15:00',
        isStaff: false
      },
      {
        id: 'MSG-005',
        sender: 'Lisa Anderson',
        content: 'I can help you set up an alternative payment method. Would you like to try PayPal?',
        timestamp: '2024-03-13T14:20:00',
        isStaff: true
      },
      {
        id: 'MSG-006',
        sender: 'Michael Brown',
        content: 'Yes, PayPal would work for me.',
        timestamp: '2024-03-14T16:30:00',
        isStaff: false
      }
    ]
  }
];

const statusFilters = [
  { label: 'All Status', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Resolved', value: 'resolved' },
  { label: 'Closed', value: 'closed' },
];

const priorityFilters = [
  { label: 'All Priorities', value: 'all' },
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
];

const categoryFilters = [
  { label: 'All Categories', value: 'all' },
  { label: 'Technical', value: 'technical' },
  { label: 'Billing', value: 'billing' },
  { label: 'Shipping', value: 'shipping' },
  { label: 'Product', value: 'product' },
];

const getStatusColor = (status: SupportTicket['status']) => {
  switch (status) {
    case 'open':
      return 'text-blue-600 bg-blue-50';
    case 'in-progress':
      return 'text-yellow-600 bg-yellow-50';
    case 'resolved':
      return 'text-green-600 bg-green-50';
    case 'closed':
      return 'text-gray-600 bg-gray-50';
  }
};

const getPriorityColor = (priority: SupportTicket['priority']) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
  }
};

const getCategoryColor = (category: SupportTicket['category']) => {
  switch (category) {
    case 'technical':
      return 'text-purple-600 bg-purple-50';
    case 'billing':
      return 'text-blue-600 bg-blue-50';
    case 'shipping':
      return 'text-orange-600 bg-orange-50';
    case 'product':
      return 'text-green-600 bg-green-50';
  }
};

export default function SupportPage() {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('all');
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewTicketModalOpen, setIsNewTicketModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [ticketsList, setTicketsList] = useState<SupportTicket[]>(tickets);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    description: '',
    priority: 'medium' as SupportTicket['priority'],
    category: 'technical' as SupportTicket['category']
  });

  const handleNewTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newTicketData: SupportTicket = {
      id: `TKT-${String(ticketsList.length + 1).padStart(3, '0')}`,
      customer: {
        name: 'Current User', // This would come from your auth system
        email: 'user@example.com', // This would come from your auth system
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      subject: newTicket.subject,
      description: newTicket.description,
      status: 'open',
      priority: newTicket.priority,
      category: newTicket.category,
      assignedTo: 'Unassigned',
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      messages: [
        {
          id: `MSG-${String(ticketsList.length + 1).padStart(3, '0')}`,
          sender: 'Current User',
          content: newTicket.description,
          timestamp: new Date().toISOString(),
          isStaff: false
        }
      ]
    };

    setTicketsList(prevTickets => [newTicketData, ...prevTickets]);
    setIsNewTicketModalOpen(false);
    setNewTicket({
      subject: '',
      description: '',
      priority: 'medium',
      category: 'technical'
    });
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    const newMessage = {
      id: `MSG-${String(selectedTicket.messages.length + 1).padStart(3, '0')}`,
      sender: 'Current User', // This would come from your auth system
      content: replyMessage,
      timestamp: new Date().toISOString(),
      isStaff: false
    };

    setTicketsList(prevTickets => 
      prevTickets.map(ticket => 
        ticket.id === selectedTicket.id 
          ? {
              ...ticket,
              messages: [...ticket.messages, newMessage],
              lastUpdated: new Date().toISOString()
            }
          : ticket
      )
    );

    setReplyMessage('');
    setIsReplyModalOpen(false);
    setSelectedTicket(null);
  };

  const handleReplyClick = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsReplyModalOpen(true);
  };

  const filteredTickets = ticketsList.filter(ticket => {
    const matchesStatus = selectedStatusFilter === 'all' || ticket.status === selectedStatusFilter;
    const matchesPriority = selectedPriorityFilter === 'all' || ticket.priority === selectedPriorityFilter;
    const matchesCategory = selectedCategoryFilter === 'all' || ticket.category === selectedCategoryFilter;
    const matchesSearch = ticket.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesPriority && matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Support</h1>
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
                placeholder="Search tickets..."
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
                  value={selectedPriorityFilter}
                  onChange={(e) => setSelectedPriorityFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors"
                >
                  {priorityFilters.map((filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-300 transition-colors"
                >
                  {categoryFilters.map((filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <button 
                onClick={() => setIsNewTicketModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                New Ticket
              </button>
            </div>
          </div>
        </div>

        {/* Tickets List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={ticket.customer.avatar}
                        alt={ticket.customer.name}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{ticket.subject}</h3>
                      <p className="text-sm text-gray-500">Ticket #{ticket.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ').charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                      {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} Priority
                    </span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(ticket.category)}`}>
                      {ticket.category.charAt(0).toUpperCase() + ticket.category.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <UserIcon className="h-5 w-5" />
                      <span>Customer</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      <p className="font-medium">{ticket.customer.name}</p>
                      <p>{ticket.customer.email}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <TagIcon className="h-5 w-5" />
                      <span>Assigned To</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      <p>{ticket.assignedTo}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ClockIcon className="h-5 w-5" />
                      <span>Timeline</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      <p>Created: {new Date(ticket.createdAt).toLocaleString()}</p>
                      <p>Updated: {new Date(ticket.lastUpdated).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <ChatBubbleLeftIcon className="h-5 w-5" />
                      <span>Latest Message</span>
                    </div>
                    <div className="text-sm text-gray-900">
                      <p className="font-medium">{ticket.messages[ticket.messages.length - 1].sender}</p>
                      <p className="truncate">{ticket.messages[ticket.messages.length - 1].content}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {ticket.messages.length} message{ticket.messages.length !== 1 ? 's' : ''} in this conversation
                    </p>
                    <button 
                      onClick={() => handleReplyClick(ticket)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                      <PaperAirplaneIcon className="h-5 w-5" />
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Ticket Modal */}
      {isNewTicketModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Create New Ticket</h3>
              <button
                onClick={() => setIsNewTicketModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircleIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleNewTicketSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Subject</label>
                <input
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Description</label>
                <textarea
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  rows={4}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as SupportTicket['priority'] })}
                    className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-1">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as SupportTicket['category'] })}
                    className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="shipping">Shipping</option>
                    <option value="product">Product</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsNewTicketModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Create Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {isReplyModalOpen && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Reply to Ticket</h3>
                <p className="text-sm text-gray-500 mt-1">#{selectedTicket.id} - {selectedTicket.subject}</p>
              </div>
              <button
                onClick={() => {
                  setIsReplyModalOpen(false);
                  setSelectedTicket(null);
                  setReplyMessage('');
                }}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XCircleIcon className="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">Your Reply</label>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  rows={4}
                  className="block w-full border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your reply here..."
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsReplyModalOpen(false);
                    setSelectedTicket(null);
                    setReplyMessage('');
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Send Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 