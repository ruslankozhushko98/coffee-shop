import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { authApi } from 'modules/auth/store/authApi';
import { authSlice } from 'modules/auth/store/authSlice';
import { menuApi } from 'modules/home/store/menuApi';
import { profileApi } from 'modules/home/store/profileApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [menuApi.reducerPath]: menuApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      menuApi.middleware,
      profileApi.middleware,
    ),
});

export type AppState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
