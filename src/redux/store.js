import { configureStore } from '@reduxjs/toolkit';
import purchaseReducer from './slice/purchaseSlice';
import productReducer from './slice/productSlice';
import categoryReducer from './slice/categorySlice';
import vendorReducer from './slice/vendorSlice';
import catalogReducer from './slice/catalogSlice';
import saleReducer from './slice/saleSlice';
import purchaseBlockReducer from './blockSlice/purchasesSlice';
import materialReducer from './blockSlice/materialSlice';
import analyticsReducer from './slice/analyticsSlice';
import saleBlockReducer from './blockSlice/saleSlice';
import sessionReducer from './blockSlice/sessionSlice';
import productBlockReducer from './blockSlice/productSlice';
import teamReducer from './blockSlice/teamSlice';
import kpiReducer from './slice/kpiSlice';
import sessionProductReducer from './blockSlice/sessionProductSlice';
import sessionMaterialReducer from './blockSlice/sessionMaterialSlice';
import authReducer from './slice/authSlice';

const store = configureStore({
  reducer: {
    purchase: purchaseReducer,
    product: productReducer,
    category: categoryReducer,
    vendor: vendorReducer,
    catalog: catalogReducer,
    sale: saleReducer,
    kpi: kpiReducer,
    auth: authReducer,
    material: materialReducer,
    purchaseBlock: purchaseBlockReducer,
    saleBlock: saleBlockReducer,
    session: sessionReducer,
    productBlock: productBlockReducer,
    team: teamReducer,
    sessionProduct: sessionProductReducer,
    sessionMaterial:sessionMaterialReducer,
  },
});

export default store;
