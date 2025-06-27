import React from 'react';

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  productCounts 
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <button
          onClick={() => onCategoryChange('all')}
          className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <div>All</div>
          <div className="text-xs opacity-75">
            {Object.values(productCounts).reduce((a, b) => a + b, 0)}
          </div>
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div>{category.name}</div>
            <div className="text-xs opacity-75">
              {productCounts[category.id] || 0}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}