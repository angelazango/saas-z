import axios from 'axios';
import { URL } from '@/config';

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${URL}/product`);
    return response.data.products || []; // Ensure we always return an array
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(`${URL}/product`, productData);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Add other product API calls as needed