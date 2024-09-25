import { configureStore } from '@reduxjs/toolkit';
import { api } from './api/api';
import authReducer from './authSlice';
import usersReducer from './userSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});
