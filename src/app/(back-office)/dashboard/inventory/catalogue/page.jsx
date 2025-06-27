// src/app/catalog/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { PenBoxIcon, Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog } from '@/src/redux/thunks/catalogThunks';
import CatalogForm from './new/page';

export default function CatalogList() {
  const dispatch = useDispatch();
  const { catalog, loading, error } = useSelector((state) => state.catalog);
  const [showForm, setShowForm] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(fetchCatalog());
  }, [dispatch]);

  const handleAddItem = () => {
    setSelectedItem(null);
    setShowForm(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this catalog item?')) {
      await dispatch(deleteCatalogItem(itemId));
    }
  };

  const handleFormCancel = () => setShowForm(false);

  const handleFormSuccess = () => {
    setShowForm(false);
    dispatch(fetchCatalog());
  };

  return (
    <div className="max-w-10xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">Product Catalog</h2>
          <button
            onClick={handleAddItem}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
          >
            <span>+</span>
            <span>Add Product</span>
          </button>
        </div>

        {loading && (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
            <p className="mt-4 text-gray-600">Loading catalog...</p>
          </div>
        )}

        {error && !loading && (
          <div className="p-8 text-center text-red-500">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchCatalog())}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && catalog.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No catalog items found</h3>
            <p className="text-gray-500 mb-6">
              Get started by adding your first product to the catalog.
            </p>
            <button
              onClick={handleAddItem}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Add Your First Product
            </button>
          </div>
        )}

        {!loading && !error && catalog.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price (XAF)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {catalog.map((item, index) => (
                    <tr key={item.id ?? `fallback-key-${index}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.product_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.unit_price.toLocaleString()} XAF
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <PenBoxIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t bg-gray-50 text-center">
              <span className="text-sm text-gray-700">Total Products: {catalog.length}</span>
            </div>
          </>
        )}
      </div>

      {showForm && (
        <CatalogForm
          catalogItem={selectedItem}
          onCancel={handleFormCancel}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}
