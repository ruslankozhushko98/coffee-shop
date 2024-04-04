import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@env';

import { API_TAG_TYPES } from 'libs/utils/constants';
import { User } from 'modules/auth/models';
import { ResetPasswordDto } from 'modules/forgot-password/utils/types';

export const forgotPasswordApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [API_TAG_TYPES.FORGOT_PASSWORD],
  endpoints: builder => ({
    resetPassword: builder.mutation<User, ResetPasswordDto>({
      query: data => ({
        url: 'account/reset-password',
        method: 'PUT',
        data,
      }),
    }),
  }),
});

export const { useResetPasswordMutation } = forgotPasswordApi;
