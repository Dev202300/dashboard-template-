'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  image: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const initialProducts: Product[] = [
  {
    id: 'PRD-001',
    name: 'Nike Air Max',
    category: 'shoes',
    price: 199.99,
    stock: 50,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60',
    status: 'in-stock',
  },
  {
    id: 'PRD-002',
    name: 'Adidas Ultraboost',
    category: 'shoes',
    price: 179.99,
    stock: 30,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60',
    status: 'in-stock',
  },
  {
    id: 'PRD-003',
    name: 'Puma RS-X',
    category: 'shoes',
    price: 89.99,
    stock: 15,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60',
    status: 'low-stock',
  },
  {
    id: 'PRD-004',
    name: 'New Balance 574 Classic',
    category: 'shoes',
    price: 95.00,
    stock: 28,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60',
    status: 'in-stock',
  },
  {
    id: 'PRD-005',
    name: 'Nike Air Jordan 1 High',
    category: 'shoes',
    price: 170.00,
    stock: 15,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&auto=format&fit=crop&q=60',
    status: 'low-stock',
  },
  {
    id: 'PRD-006',
    name: 'Adidas Forum Low',
    category: 'shoes',
    price: 100.00,
    stock: 35,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=60',
    status: 'in-stock',
  },
  {
    id: 'PRD-007',
    name: 'Puma Future Rider',
    category: 'shoes',
    price: 85.00,
    stock: 20,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=800&auto=format&fit=crop&q=60',
    status: 'in-stock',
  },
  {
    id: 'PRD-008',
    name: 'New Balance 327',
    category: 'shoes',
    price: 100.00,
    stock: 8,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=60',
    status: 'low-stock',
  }
];

const categoryFilters = [
  { label: 'All Categories', value: 'all' },
  { label: 'Shoes', value: 'shoes' },
  { label: 'Clothing', value: 'clothing' },
  { label: 'Accessories', value: 'accessories' },
];

const getStatusColor = (status: Product['status']) => {
  switch (status) {
    case 'in-stock':
      return 'text-green-600 bg-green-50';
    case 'low-stock':
      return 'text-yellow-600 bg-yellow-50';
    case 'out-of-stock':
      return 'text-red-600 bg-red-50';
  }
};

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load products from localStorage or use initial products
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
      localStorage.setItem('products', JSON.stringify(initialProducts));
    }
    setIsLoading(false);
  }, []);

  // Update localStorage when products change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products, isLoading]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (productId: string) => {
    router.push(`/products/edit/${productId}`);
  };

  const handleDelete = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== productToDelete.id));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 pb-2">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              />
            </div>
            <div className="flex gap-3">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2.5 pr-10 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-colors"
                >
                  {categoryFilters.map((filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="h-4 w-4 text-gray-500 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
              <button 
                onClick={() => router.push('/products/add')}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="text-xs text-gray-500">{product.id}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                    {product.status.replace('-', ' ')}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{product.stock} in stock</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(product.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit product"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete product"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && productToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Delete Product</h3>
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{productToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 