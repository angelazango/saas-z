'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '@/config';

export default function ProductForm({ product = null, onCancel, onSuccess }) {
  const [products, setProducts] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch all products from /product
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${URL}/product`);
        setProducts(res.data.products); // Assuming the response is { products: [...] }
      } catch (err) {
        setError('Failed to load products');
      }
    };

    fetchProducts();
  }, []);

  // ✅ Pre-fill fields if editing an existing catalog product
  useEffect(() => {
    if (product && products.length > 0) {
      const matched = products.find((p) => p.id === product.product_id);
      setSelectedName(matched?.name || '');
      setUnitPrice(product.unit_price);
    }
  }, [product, products]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const selectedProduct = products.find((p) => p.name === selectedName);
    if (!selectedProduct) {
      setError('Please select a valid product name.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        product_id: selectedProduct.id,
        unit_price: Number(unitPrice),
      };

      if (product) {
        await axios.put(`${URL}/catalog/${product.id}`, payload);
      } else {
        await axios.post(`${URL}/catalog`, payload);
      }

      onSuccess();
    } catch (err) {
      setError('Failed to save catalog item.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-lg font-semibold mb-4">{product ? 'Edit' : 'Add'} Catalog Item</h3>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          >
            <option value="">Select a product</option>
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {/* Unit Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Unit Price</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? 'Saving...' : product ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}
