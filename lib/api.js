// lib/api.js
import { URL } from '@/config';

export async function fetchMaterialsAnalytics() {
  const res = await fetch(`${URL}/blocks/material`);
  if (!res.ok) throw new Error('Failed to fetch material');
  return await res.json();
}

export async function fetchSalesAnalytics() {
  const res = await fetch(`${URL}/blocks/sale`);
  if (!res.ok) throw new Error('Failed to fetch sale');
  return await res.json();
}

export async function fetchPurchasesAnalytics() {
  const res = await fetch(`${URL}/blocks/purchase`);
  if (!res.ok) throw new Error('Failed to fetch purchase');
  return await res.json();
}
