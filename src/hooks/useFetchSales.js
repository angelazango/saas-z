// src/hooks/useFetchSales.js
"use client"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import {
  fetchSalesStart,
  fetchSalesSuccess,
  fetchSalesFailure,
} from '@/src/redux/blockSlice/saleSlice';

import { URL } from '@/config';

export const useFetchSales = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        dispatch(fetchSalesStart());
        const res = await axios.get(`${URL}/blocks/sale`);
        dispatch(fetchSalesSuccess(res.data.sales || []));
      } catch (err) {
        dispatch(fetchSalesFailure('Failed to fetch sales.'));
      }
    };

    fetchSales();
  }, [dispatch]);
};
