
import { configureStore } from '@reduxjs/toolkit';
import purchaseReducer from './slice/purchaseSlice';
import productReducer from './slice/productSlice';
import categoryReducer from './slice/categorySlice';
import vendorReducer from './slice/vendorSlice';
import catalogReducer from './slice/catalogSlice';
import authReducer from './slice/authentication';
import salesReducer from './slice/saleSlice';
// import dashboardReducer from './dashboardSlice';



const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
     product: productReducer,
     category: categoryReducer,
     vendor: vendorReducer,
     catalog: catalogReducer,
     sales: salesReducer,
     authentication: authReducer,
     
  },
});

export default store;
