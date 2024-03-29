import { useQuery } from '@tanstack/react-query';

import { useGlobalContext } from 'contexts/globalContext';
import { Queries } from 'libs/utils/constants';
import { menuService } from 'modules/home/services';

export const useFetchFavoriteBeverages = () => {
  const { user } = useGlobalContext();

  return useQuery({
    queryKey: [Queries.FETCH_FAVORITES_BEVERAGES],
    queryFn: menuService.fetchFavoriteBeverages,
    enabled: Boolean(user),
  });
};
