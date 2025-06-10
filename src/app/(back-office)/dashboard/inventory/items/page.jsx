"use client";

import React, { useState, useEffect } from "react";
import { Pencil, Trash2, Eye, Plus, Search, X } from "lucide-react";

export default function ItemsManagement() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // Load items from localStorage on component mount
  useEffect(() => {
    const loadItems = () => {
      try {
        const storedItems = JSON.parse(localStorage.getItem("items") || "[]");
        setItems(storedItems);
        setFilteredItems(storedItems);
      } catch (error) {
        console.error("Error loading items from localStorage:", error);
        setItems([]);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadItems();

    // Listen for storage changes (when new items are added)
    const handleStorageChange = () => {
      loadItems();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("itemsUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("itemsUpdated", handleStorageChange);
    };
  }, []);

  // Filter items based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.SKU?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.barcode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm, items]);

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const updatedItems = items.filter((_, i) => i !== index);
      setItems(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      window.dispatchEvent(new CustomEvent("itemsUpdated"));
    }
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleEdit = (item, index) => {
    setEditingItem({ ...item });
    setEditingIndex(index);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null) {
      const updatedItems = [...items];
      updatedItems[editingIndex] = editingItem;
      setItems(updatedItems);
      localStorage.setItem("items", JSON.stringify(updatedItems));
      window.dispatchEvent(new CustomEvent("itemsUpdated"));
      setShowEditModal(false);
      setEditingItem(null);
      setEditingIndex(null);
    }
  };

  const handleNewItem = () => {
    window.location.href = "/dashboard/inventory/items/new";
  };

  const formatPrice = (price) => {
    return price ? `$${parseFloat(price).toFixed(2)}` : "N/A";
  };

  const getCategoryLabel = (categoryId) => {
    const categories = {
      "fgcui356767": "Electronics",
      "branch457676": "Equipments"
    };
    return categories[categoryId] || "Unknown";
  };

  const getUnitLabel = (unitId) => {
    const units = {
      "fgcui356767": "Kg",
      "branch457676": "Pcs"
    };
    return units[unitId] || "Unknown";
  };

  const getBrandLabel = (brandId) => {
    const brands = {
      "fgcui356767": "Angela",
      "branch457676": "Adidas"
    };
    return brands[brandId] || "Unknown";
  };

  const getWarehouseLabel = (warehouseId) => {
    const warehouses = {
      "fgcui356767": "Warehouse Bamenda",
      "branch457676": "Warehouse Yaounde",
      "branch457677": "Warehouse Graoua"
    };
    return warehouses[warehouseId] || "Unknown";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Add Button */}
      {/* <div className="bg-white dark:bg-green-300 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"> */}
        <div className="flex  sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
          
            {/* <p className="text-gray-600 dark:text-gray-400">
              Manage your  items  with ease({filteredItems.length} items)
            </p>  */}
          </div>
          
          <div className="flex mt-3 sm:flex-row gap-270">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 
                 text-gray-900 dark:text-white w-full sm:w-64"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 
                  text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Add New Item Button */}
            <button
              onClick={handleNewItem}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg
               hover:bg-blue-700 transition-colors whitespace-nowrap"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </button>

          </div>
        </div>
  

      {/* Items Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8v2m0 0V5m0 2h2m-2 0H8"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {searchTerm ? "No items found" : "No items yet"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {searchTerm ? `No items match "${searchTerm}"` : "Get started by creating your first item."}
            </p>
            {!searchTerm && (
              <button
                onClick={handleNewItem}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Item
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Item Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category & Brand</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Inventory</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pricing</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Warehouse</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredItems.map((item, index) => {
                  const originalIndex = items.findIndex(originalItem => 
                    originalItem.title === item.title && 
                    originalItem.SKU === item.SKU && 
                    originalItem.createdAt === item.createdAt
                  );
                  
                  return (
                    <tr key={`${item.SKU}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                          {item.imageUrl ? (
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                          ) : (
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                            </svg>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.title || "Untitled Item"}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">SKU: {item.SKU || "N/A"}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Barcode: {item.barcode || "N/A"}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{getCategoryLabel(item.categoryId)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{getBrandLabel(item.brandId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">Qty: {item.Qty || "0"}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Unit: {getUnitLabel(item.unitId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">Buy: {formatPrice(item.buyingPrice)}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Sell: {formatPrice(item.sellingPrice)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{getWarehouseLabel(item.warehouseId)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleView(item)}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleEdit(item, originalIndex)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 p-1 rounded"
                            title="Edit Item"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(originalIndex)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                            title="Delete Item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Item Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {selectedItem.imageUrl && (
                    <div>
                      <img
                        src={selectedItem.imageUrl}
                        alt={selectedItem.title}
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">{selectedItem.title}</h3>
                    {selectedItem.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-2">{selectedItem.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">SKU:</label>
                      <p className="text-gray-900 dark:text-white">{selectedItem.SKU || "N/A"}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Barcode:</label>
                      <p className="text-gray-900 dark:text-white">{selectedItem.barcode || "N/A"}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Category:</label>
                      <p className="text-gray-900 dark:text-white">{getCategoryLabel(selectedItem.categoryId)}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Brand:</label>
                      <p className="text-gray-900 dark:text-white">{getBrandLabel(selectedItem.brandId)}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Quantity:</label>
                      <p className="text-gray-900 dark:text-white">{selectedItem.Qty || "0"} {getUnitLabel(selectedItem.unitId)}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Warehouse:</label>
                      <p className="text-gray-900 dark:text-white">{getWarehouseLabel(selectedItem.warehouseId)}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Buying Price:</label>
                      <p className="text-gray-900 dark:text-white">{formatPrice(selectedItem.buyingPrice)}</p>
                    </div>
                    <div>
                      <label className="font-medium text-gray-700 dark:text-gray-300">Selling Price:</label>
                      <p className="text-gray-900 dark:text-white">{formatPrice(selectedItem.sellingPrice)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Item</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingItem.title || ""}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">SKU</label>
                  <input
                    type="text"
                    value={editingItem.SKU || ""}
                    onChange={(e) => setEditingItem({...editingItem, SKU: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Barcode</label>
                  <input
                    type="text"
                    value={editingItem.barcode || ""}
                    onChange={(e) => setEditingItem({...editingItem, barcode: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={editingItem.Qty || ""}
                    onChange={(e) => setEditingItem({...editingItem, Qty: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Buying Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.buyingPrice || ""}
                    onChange={(e) => setEditingItem({...editingItem, buyingPrice: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Selling Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={editingItem.sellingPrice || ""}
                    onChange={(e) => setEditingItem({...editingItem, sellingPrice: e.target.value})}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  value={editingItem.description || ""}
                  onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}