import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '@env';

import {
  API_TAG_IDS,
  API_TAG_TYPES,
  AsyncStorageKeys,
} from 'libs/utils/constants';
import { Beverage } from 'modules/home/models';
import { ToggleBeverageFavoriteDto } from 'modules/home/utils/types';

export const menuApi = createApi({
  reducerPath: 'menuApi',
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
  tagTypes: [API_TAG_TYPES.MENU],
  endpoints: builder => ({
    fetchBeverages: builder.query<Array<Beverage>, string | undefined>({
      query: title => ({
        url: 'menu/all',
        params: { title },
      }),
      providesTags: [
        { type: API_TAG_TYPES.MENU, id: API_TAG_IDS.FETCH_ALL_BEVERAGES },
      ],
    }),

    fetchFavoriteBeverages: builder.query<Array<Beverage>, void>({
      query: () => 'menu/favorites',
      providesTags: [
        { type: API_TAG_TYPES.MENU, id: API_TAG_IDS.FETCH_FAVORITE_BEVERAGES },
      ],
    }),

    fetchBeverageById: builder.query<Beverage, number>({
      query: beverageId => ({
        url: `menu/${beverageId}`,
      }),
      providesTags: [
        { type: API_TAG_TYPES.MENU, id: API_TAG_IDS.FETCH_BEVERAGE_BY_ID },
      ],
    }),

    toggleBeverageFavorite: builder.mutation<
      ToggleBeverageFavoriteDto,
      ToggleBeverageFavoriteDto
    >({
      query: data => ({
        url: 'menu/toggle-favorite',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: [
        { type: API_TAG_TYPES.MENU, id: API_TAG_IDS.FETCH_BEVERAGE_BY_ID },
        { type: API_TAG_TYPES.MENU, id: API_TAG_IDS.FETCH_FAVORITE_BEVERAGES },
      ],
    }),
  }),
});

export const {
  useFetchBeveragesQuery,
  useFetchFavoriteBeveragesQuery,
  useFetchBeverageByIdQuery,
  useToggleBeverageFavoriteMutation,
} = menuApi;
