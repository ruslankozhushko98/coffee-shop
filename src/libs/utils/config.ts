import 'react-native-url-polyfill/auto';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient } from '@tanstack/react-query';
import { BASE_URL } from '@env';

export const queryClient = new QueryClient();

export const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AsyncStorage.getItem('access_token').then(
      res => res,
    )}`,
  },
});

httpClient.interceptors.response.use(
  res => res,
  error => {
    throw new Error(error.response.data.message);
  },
);
