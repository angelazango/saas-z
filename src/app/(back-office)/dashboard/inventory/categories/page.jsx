"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('categories') || '[]');
    setCategories(saved);
  }, []);

  const deleteCategory = (id) => {
    const updated = categories.filter((cat) => cat.id !== id);
    localStorage.setItem('categories', JSON.stringify(updated));
    setCategories(updated);
  };

  const editCategory = (id) => {
    const newTitle = prompt("Enter new title:");
    const newDescription = prompt("Enter new description:");

    if (newTitle && newDescription) {
      const updated = categories.map((cat) =>
        cat.id === id ? { ...cat, title: newTitle, description: newDescription } : cat
      );
      localStorage.setItem('categories', JSON.stringify(updated));
      setCategories(updated);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Categories Page</h1>
      <Link href="/dashboard/inventory/categories/new">
        <button className="bg-purple-600 text-white px-4 py-2 rounded mb-4">+ New Category</button>
      </Link>

      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat, index) => (
              <tr key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-2 border">{index + 1}</td>
                <td className="p-2 border">{cat.title}</td>
                <td className="p-2 border">{cat.description}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-600 mr-2"
                    onClick={() => editCategory(cat.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-600"
                    onClick={() => deleteCategory(cat.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
