// app/providers.jsx
'use client';

import { Provider } from 'react-redux';
import store from '@/src/redux/store';



export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
