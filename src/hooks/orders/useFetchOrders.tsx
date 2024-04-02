import { useQuery } from '@tanstack/react-query';

import { Queries } from 'libs/utils/constants';
import { ordersService } from 'modules/home/services';

export const useFetchOrders = () =>
  useQuery({
    queryKey: [Queries.FETCH_ORDERS],
    queryFn: ordersService.fetchOrders,
  });
