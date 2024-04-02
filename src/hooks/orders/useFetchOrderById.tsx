import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Text, useToast } from 'native-base';

import { Queries } from 'libs/utils/constants';
import { ordersService } from 'modules/home/services';

export const useFetchOrderById = (orderId: number | null) => {
  const toast = useToast();
  const { isError, error, ...params } = useQuery({
    queryKey: [Queries.FETCH_BEVERAGE_BY_ID, orderId],
    queryFn: () => ordersService.fetchOrderById(Number(orderId)),
    enabled: Boolean(orderId),
  });

  useEffect(() => {
    if (isError && error) {
      toast.show({
        placement: 'top',
        title: (
          <Text color="white" fontWeight="bold">
            {error?.message}
          </Text>
        ),
        style: {
          backgroundColor: 'red',
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  return {
    isError,
    error,
    ...params,
  };
};
