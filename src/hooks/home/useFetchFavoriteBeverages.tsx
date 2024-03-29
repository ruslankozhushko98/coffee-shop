import { useQuery } from '@tanstack/react-query';

import { Queries } from 'libs/utils/constants';
import { menuService } from 'modules/home/services';

export const useFetchFavoriteBeverages = () =>
  useQuery({
    queryKey: [Queries.FETCH_FAVORITES_BEVERAGES],
    queryFn: menuService.fetchFavoriteBeverages,
  });
