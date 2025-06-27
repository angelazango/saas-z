// hooks/useProducts.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/slice/productSlice';


const useProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        dispatch(setProducts(data.products));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);
};

export default useProducts;