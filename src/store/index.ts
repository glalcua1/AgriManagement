import { configureStore } from '@reduxjs/toolkit';
import farmSlice from './slices/farmSlice';
import leaseSlice from './slices/leaseSlice';
import lesseeSlice from './slices/lesseeSlice';
import expenseSlice from './slices/expenseSlice';
import revenueSlice from './slices/revenueSlice';
import weatherSlice from './slices/weatherSlice';
import dashboardSlice from './slices/dashboardSlice';
import uiSlice from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    farms: farmSlice,
    leases: leaseSlice,
    lessees: lesseeSlice,
    expenses: expenseSlice,
    revenue: revenueSlice,
    weather: weatherSlice,
    dashboard: dashboardSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['register', 'rehydrate'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 