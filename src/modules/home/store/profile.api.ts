import AsyncStorage from '@react-native-async-storage/async-storage';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@env';

import { API_TAG_TYPES, AsyncStorageKeys } from 'libs/utils/constants';
import { User } from 'modules/auth/models';
import { EditProfileDto } from 'modules/home/utils/types';

export const profileApi = createApi({
  reducerPath: 'profileApi',
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
  tagTypes: [API_TAG_TYPES.PROFILE],
  endpoints: builder => ({
    editProfile: builder.mutation<User, EditProfileDto>({
      query: data => ({
        url: 'profile/edit',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useEditProfileMutation } = profileApi;
