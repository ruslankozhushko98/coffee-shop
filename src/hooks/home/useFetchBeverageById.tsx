import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Text, useToast } from 'native-base';

import { Queries } from 'libs/utils/constants';
import { menuService } from 'modules/home/services';

export const useFetchBeverageById = (beverageId: number | null) => {
  const toast = useToast();
  const { goBack } = useNavigation();

  const { isError, error, ...params } = useQuery({
    queryKey: [Queries.FETCH_BEVERAGE_BY_ID, beverageId],
    queryFn: () => menuService.fetchBeverageById(Number(beverageId)),
    enabled: Boolean(beverageId),
  });

  useEffect(() => {
    if (isError && error) {
      goBack();

      toast.show({
        placement: 'bottom',
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
