import { configureStore } from '@reduxjs/toolkit';
import { fetchBaseQuery, setupListeners } from '@reduxjs/toolkit/query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

import { menuApi } from 'modules/home/store/menu.api';
import { AsyncStorageKeys } from 'libs/utils/constants';

export const store = configureStore({
  reducer: {
    [menuApi.reducerPath]: menuApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(menuApi.middleware),
});

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  async prepareHeaders(headers) {
    const accessToken = await AsyncStorage.getItem(
      AsyncStorageKeys.accessToken,
    );

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

setupListeners(store.dispatch);
