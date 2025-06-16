import axios from 'axios';
import { URL } from '@/config';

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${URL}/category`);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch categories';
  }
};

export const createCategory = async (categoryData) => {
  try {
    const response = await axios.post(`${URL}/category`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to create category';
  }
};

export const updateCategory = async (id, categoryData) => {
  try {
    const response = await axios.put(`${URL}/category/${id}`, categoryData);
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to update category';
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(`${URL}/category/${id}`);
    return id;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to delete category';
  }
};
