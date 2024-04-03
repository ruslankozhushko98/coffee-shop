import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { menuApi } from 'modules/home/store/menu.api';
import { profileApi } from 'modules/home/store/profile.api';

export const store = configureStore({
  reducer: {
    [menuApi.reducerPath]: menuApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(menuApi.middleware, profileApi.middleware),
});

setupListeners(store.dispatch);
