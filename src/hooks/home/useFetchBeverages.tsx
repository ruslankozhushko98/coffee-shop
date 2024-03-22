import { useQuery } from '@tanstack/react-query';

import { Queries } from 'libs/utils/constants';
import { menuService } from 'modules/home/services';

export const useFetchBeverages = (title?: string) =>
  useQuery({
    queryKey: [Queries.FETCH_BEVERAGES, title],
    queryFn: () => menuService.fetchBeverages(title),
  });
