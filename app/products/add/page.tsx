'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

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

interface ProductForm {
  name: string;
  category: string;
  price: string;
  stock: string;
  rating: string;
  image: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

const initialFormData: ProductForm = {
  name: '',
  category: 'shoes',
  price: '',
  stock: '',
  rating: '',
  image: '',
  status: 'in-stock',
};

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState<ProductForm>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Get existing products to determine the next ID
      const existingProducts = localStorage.getItem('products');
      const products = existingProducts ? JSON.parse(existingProducts) : [];
      
      // Generate a sequential ID based on the number of existing products
      const nextId = `PRD-${String(products.length + 1).padStart(3, '0')}`;

      // Create new product object
      const newProduct: Product = {
        id: nextId,
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        rating: parseFloat(formData.rating),
        image: formData.image || 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&auto=format&fit=crop&q=60',
        status: formData.status,
      };

      // Add new product to the list
      products.push(newProduct);

      // Save updated products list to localStorage
      localStorage.setItem('products', JSON.stringify(products));

      // Show success message
      alert('Product added successfully!');

      // Navigate back to products page
      router.push('/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
      setFormData(prev => ({
        ...prev,
        image: imageUrl
      }));
    }
  };

  const removeImage = () => {
    setPreviewUrl('');
    setFormData(prev => ({
      ...prev,
      image: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">Add New Product</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              {/* Left Column - Basic Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
                  
                  {/* Product Name */}
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-1">
                      Product Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter product name"
                    />
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="shoes">Shoes</option>
                      <option value="clothing">Clothing</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-900 mb-1">
                      Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Additional Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h2>
                  
                  {/* Stock */}
                  <div className="mb-6">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-900 mb-1">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                      min="0"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter stock quantity"
                    />
                  </div>

                  {/* Rating */}
                  <div className="mb-6">
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-900 mb-1">
                      Rating
                    </label>
                    <input
                      type="number"
                      id="rating"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                      min="0"
                      max="5"
                      step="0.1"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter rating (0-5)"
                    />
                  </div>

                  {/* Status */}
                  <div className="mb-6">
                    <label htmlFor="status" className="block text-sm font-medium text-gray-900 mb-1">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="in-stock">In Stock</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="border-t border-gray-200 p-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Product Image</h2>
              <div className="max-w-xl">
                {previewUrl ? (
                  <div className="relative">
                    <div className="relative h-64 w-full rounded-lg overflow-hidden">
                      <Image
                        src={previewUrl}
                        alt="Product preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                    >
                      <XMarkIcon className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex items-center justify-center w-full h-64 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <PhotoIcon className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 800x400px)</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="border-t border-gray-200 px-8 py-4 bg-gray-50">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Adding...' : 'Add Product'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 