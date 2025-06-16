'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsThunk } from '@/src/redux/thunks/productThunks';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  ChevronDown, 
  X, 
  Package, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from 'lucide-react';

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Confirmation Modal
const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, type = 'danger' }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="mb-4">
        <div className="flex items-center mb-3">
          {type === 'danger' ? (
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
          ) : (
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
          )}
          <p className="text-gray-700">{message}</p>
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 text-white rounded-lg transition-colors ${
            type === 'danger' 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {type === 'danger' ? 'Delete' : 'Confirm'}
        </button>
      </div>
    </Modal>
  );
};

// Product Form Component
const ProductForm = ({ isOpen, onClose, onSubmit, initialData = null, categories = [] }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    category_id: '',
    quantity: '',
    price: '',
    description: '',
    ...initialData
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...initialData });
    } else {
      setFormData({
        product_name: '',
        category_id: '',
        quantity: '',
        price: '',
        description: ''
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.product_name?.trim()) newErrors.product_name = 'Product name is required';
    if (!formData.category_id) newErrors.category_id = 'Category is required';
    if (!formData.quantity || formData.quantity < 0) newErrors.quantity = 'Valid quantity is required';
    if (!formData.price || formData.price < 0) newErrors.price = 'Valid price is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price)
      });
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={initialData ? 'Edit Product' : 'Add New Product'}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name *
          </label>
          <input
            type="text"
            value={formData.product_name}
            onChange={(e) => handleChange('product_name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.product_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter product name"
          />
          {errors.product_name && (
            <p className="text-red-500 text-xs mt-1">{errors.product_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            value={formData.category_id}
            onChange={(e) => handleChange('category_id', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.category_id ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
          {errors.category_id && (
            <p className="text-red-500 text-xs mt-1">{errors.category_id}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity *
            </label>
            <input
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.quantity ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.quantity && (
              <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price *
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.price ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">{errors.price}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Product description (optional)"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {initialData ? 'Update Product' : 'Add Product'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default function ProductList() {
  const dispatch = useDispatch();
  const { 
    products = [], 
    loading, 
    error 
  } = useSelector((state) => state.product);

  // Local state for UI functionality
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, product: null });

  // Mock categories - replace with actual categories from your Redux store
  const categories = [
    { id: 1, category_name: 'Electronics' },
    { id: 2, category_name: 'Clothing' },
    { id: 3, category_name: 'Books' },
    { id: 4, category_name: 'Home & Garden' }
  ];

  useEffect(() => {
    dispatch(fetchProductsThunk());
  }, [dispatch]);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.product_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category?.id?.toString() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // CRUD Operations
  const handleCreate = async (productData) => {
    try {
      // Replace with your actual create thunk
      // await dispatch(createProductThunk(productData));
      console.log('Creating product:', productData);
      setShowForm(false);
      // Show success notification
    } catch (error) {
      console.error('Error creating product:', error);
      // Show error notification
    }
  };

  const handleUpdate = async (productData) => {
    try {
      // Replace with your actual update thunk
      // await dispatch(updateProductThunk({ id: editingProduct.id, data: productData }));
      console.log('Updating product:', productData);
      setShowForm(false);
      setEditingProduct(null);
      // Show success notification
    } catch (error) {
      console.error('Error updating product:', error);
      // Show error notification
    }
  };

  const handleDelete = async () => {
    try {
      // Replace with your actual delete thunk
      // await dispatch(deleteProductThunk(deleteConfirm.product.id));
      console.log('Deleting product:', deleteConfirm.product);
      setDeleteConfirm({ show: false, product: null });
      // Show success notification
    } catch (error) {
      console.error('Error deleting product:', error);
      // Show error notification
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (product) => {
    setDeleteConfirm({ show: true, product });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
  };

  if (loading) return (
    <div className="p-8 flex flex-col justify-center items-center h-64 bg-white rounded-lg shadow-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4" />
      <p className="text-gray-600">Loading products...</p>
    </div>
  );

  if (error) return (
    <div className="p-8 text-center bg-white rounded-lg shadow-sm">
      <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <p className="text-red-600 text-lg font-medium mb-2">Error loading products</p>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={() => dispatch(fetchProductsThunk())}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <Package className="h-8 w-8 text-blue-600 mr-3" />
              Products
            </h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              {(searchTerm || selectedCategory) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id.toString()}>
                        {category.category_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Products Table */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {products.length === 0 ? 'No products found' : 'No matching products'}
          </h3>
          <p className="text-gray-600 mb-6">
            {products.length === 0 
              ? 'Create your first product to get started.' 
              : 'Try adjusting your search or filters.'}
          </p>
          {products.length === 0 && (
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Your First Product
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.product_name}
                        </div>
                        {product.description && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category?.category_name || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className={`text-sm font-medium ${
                          (product.quantity ?? 0) > 10 
                            ? 'text-green-600' 
                            : (product.quantity ?? 0) > 0 
                            ? 'text-yellow-600' 
                            : 'text-red-600'
                        }`}>
                          {product.quantity ?? 'N/A'}
                        </span>
                        {(product.quantity ?? 0) <= 10 && (product.quantity ?? 0) > 0 && (
                          <span className="ml-2 text-xs text-yellow-600">Low stock</span>
                        )}
                        {(product.quantity ?? 0) === 0 && (
                          <span className="ml-2 text-xs text-red-600">Out of stock</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${product.price?.toFixed(2) || '0.00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (product.quantity ?? 0) > 0 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {(product.quantity ?? 0) > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors"
                          title="Edit product"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination placeholder */}
          <div className="bg-white px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ProductForm
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleUpdate : handleCreate}
        initialData={editingProduct}
        categories={categories}
      />

      <ConfirmModal
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false, product: null })}
        onConfirm={handleDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteConfirm.product?.product_name}"? This action cannot be undone.`}
        type="danger"
      />
    </div>
  );
}