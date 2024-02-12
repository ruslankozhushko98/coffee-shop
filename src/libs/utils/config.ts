import 'react-native-url-polyfill/auto';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from '@tanstack/react-query';
import { BASE_URL } from '@env';

import { AsyncStorageKeys } from './constants';

export const queryClient = new QueryClient();

export const httpClient = axios.create({
  baseURL: BASE_URL,
});

httpClient.interceptors.request.use(
  async res => {
    const accessToken = await AsyncStorage.getItem(
      AsyncStorageKeys.accessToken,
    );

    if (accessToken) {
      res.headers.Authorization = `Bearer ${accessToken}`;
    }

    return res;
  },
  error => {
    throw new Error(error.response.data.message);
  },
);

httpClient.interceptors.response.use(
  res => res,
  error => {
    throw new Error(error.response.data.message);
  },
);
