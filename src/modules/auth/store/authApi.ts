import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

import {
  API_TAG_IDS,
  API_TAG_TYPES,
  AsyncStorageKeys,
} from 'libs/utils/constants';
import { AuthObj, SignInDto, SignUpDto } from 'modules/auth/utils/types';
import { User } from 'modules/auth/models';
import { setUser } from './authSlice';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
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
  }),
  tagTypes: [API_TAG_TYPES.AUTH],
  endpoints: builder => ({
    signIn: builder.mutation<AuthObj, SignInDto>({
      query: data => ({
        url: 'auth/sign-in',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setUser(data.user));
        } catch (error) {
          api.dispatch(setUser(null));
        }
      },
    }),

    signUp: builder.mutation<AuthObj, SignUpDto>({
      query: data => ({
        url: 'auth/sign-up',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setUser(data.user));
        } catch (error) {
          api.dispatch(setUser(null));
        }
      },
    }),

    fetchMe: builder.query<User, void>({
      query: () => 'auth/me',
      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setUser(data));
        } catch (error) {
          api.dispatch(setUser(null));
        }
      },
      providesTags: [{ type: API_TAG_TYPES.AUTH, id: API_TAG_IDS.FETCH_ME }],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignUpMutation,
  useFetchMeQuery,
  useLazyFetchMeQuery,
} = authApi;
