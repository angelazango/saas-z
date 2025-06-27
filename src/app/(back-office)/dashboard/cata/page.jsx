// app/catalog/page.jsx
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [categories, setCategories] = useState(['Tous']);

  useEffect(() => {
    // Load products from JSON file
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        
        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.products.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on search term and category
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-xl font-bold -mt-6 ">Catalogue des Produits</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-8  rounded-lg shadow-md">
        <div className="flex flex-col-2 md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search by name
            </label>
            <input
              type="text"
              id="search"
              placeholder="Entrez le nom du produit..."
              className="w-88 p-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex-1">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
             filter by category
            </label>
            <select
              id="category"
              className="w-88 p-2 border border-gray-300 rounded-md"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        <p className="text-sm text-gray-600">
          {filteredProducts.length} available products
        </p>
      </div>
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-42 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  {product.category}
                </span>
                <p className="text-xl font-bold text-green-600 mb-2">
                  {formatPrice(product.price)}
                </p>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">None found</p>
          <button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
            }}
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            Update filters
          </button>
        </div>
      )}
    </div>
  );
}