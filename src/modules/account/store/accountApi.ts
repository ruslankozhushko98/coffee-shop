import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

import { MsgOpts } from 'libs/utils/types';
import { AsyncStorageKeys } from 'libs/utils/constants';
import {
  AccountVerificationDto,
  VerificationResponse,
} from 'modules/account/utils/types';
import { UserCheckObj } from 'modules/forgot-password/utils/types';

export const accountApi = createApi({
  reducerPath: 'accountApi',
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
  endpoints: builder => ({
    activateAccount: builder.mutation<MsgOpts, AccountVerificationDto>({
      query: data => ({
        url: 'account/email/activate',
        method: 'POST',
        data,
      }),
    }),

    verifyAccount: builder.mutation<
      VerificationResponse,
      AccountVerificationDto
    >({
      query: data => ({
        url: 'account/email/verify',
        method: 'POST',
        data,
      }),
    }),

    requestAccountVerification: builder.mutation<UserCheckObj, string>({
      query: email => ({
        url: 'account/check-user',
        method: 'POST',
        data: { email },
      }),
    }),
  }),
});

export const {
  useActivateAccountMutation,
  useVerifyAccountMutation,
  useRequestAccountVerificationMutation,
} = accountApi;
