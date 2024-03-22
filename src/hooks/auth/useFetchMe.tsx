import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useGlobalContext } from 'contexts/globalContext';
import { Queries } from 'libs/utils/constants';
import { authService } from 'modules/auth/services';

export const useFetchMe = () => {
  const { setUser, user } = useGlobalContext();

  const { data, ...params } = useQuery({
    queryKey: [Queries.FETCH_ME],
    queryFn: authService.fetchMe,
  });

  useEffect(() => {
    if (!user) {
      setUser(data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, user]);

  return {
    ...params,
    data,
  };
};
