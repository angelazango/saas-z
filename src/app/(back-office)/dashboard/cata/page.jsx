'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        const uniqueCategories = ['All', ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let results = products;

    if (searchTerm) {
      results = results.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      results = results.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(results);
  }, [searchTerm, selectedCategory, products]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-screen-xl mx-auto px-4">
        {/* Title */}
        <h1 className="text-2xl font-bold text-red-800 animate-bounce mb-5">Product Catalog</h1>

        {/* Filters */}
        <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg shadow">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2">Search Products</label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full  border border-gray-300 rounded-md p-3 focus:ring-2 
              focus:ring-blue-100 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter summary */}
        <div className="flex justify-between items-center ">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          {(searchTerm || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition p-4">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="text-lg font-bold text-gray-800">{formatPrice(product.price)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-10 rounded-lg text-center shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">Try a different search or category filter.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
