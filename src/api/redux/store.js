import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authentication/authSlice';
import { authApiSlice } from './features/authentication/authApiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApiSlice.middleware),
});