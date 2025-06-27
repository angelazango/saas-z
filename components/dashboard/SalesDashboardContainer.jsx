'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { URL } from '@/config';
import {
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
} from '@/src/redux/slice/saleSlice';
import SalesChart from './SalesChart';
// import SalesChart from './SalesChart';
import SalesSummary from './SalesSummary.jsx';

const SalesDashboard = () => {
  const dispatch = useDispatch();
  const { sales, loading, error } = useSelector((state) => state.sale);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        dispatch(fetchSalesStart());
        const response = await axios.get(`${URL}/sale`);
        
        // Process dates before dispatching
        const processedSales = response.data.sales.map(sale => ({
          ...sale,
          // Convert to Date object temporarily for validation
          date: sale.date ? new Date(sale.date) : null
        }));
        
        dispatch(fetchSalesSuccess(processedSales));
      } catch (err) {
        dispatch(fetchSalesFailure(err.response?.data?.message || 'Failed to fetch sales.'));
      }
    };
    fetchSales();
  }, [dispatch]);

  // Convert ISO strings back to Date objects for the chart
  const chartData = sales.map(sale => ({
    ...sale,
    date: sale.date ? new Date(sale.date) : null,
    formattedDate: sale.date ? new Date(sale.date).toLocaleDateString() : 'No date'
  }));

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500 text-center">
      <p>{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Retry
      </button>
    </div>
  );

  if (!sales || sales.length === 0) return (
    <div className="text-center p-8 text-gray-500">
      <p>No sales data available</p>
    </div>
  );

  return (
    <div className="p-6">
      <SalesSummary sales={sales} />
      <SalesChart salesData={chartData} />
    </div>
  );
};

export default SalesDashboard;