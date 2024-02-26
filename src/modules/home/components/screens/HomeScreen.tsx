import React, { FC, useEffect } from 'react';
import { Text, View } from 'native-base';
import { useQuery } from '@tanstack/react-query';

import { useGlobalContext } from 'contexts/globalContext';
import { Queries } from 'libs/utils/constants';
import { authService } from 'modules/auth/services';

export const HomeScreen: FC = () => {
  const { setUser, user } = useGlobalContext();

  const { isLoading, data } = useQuery({
    queryKey: [Queries.FETCH_ME],
    queryFn: authService.fetchMe,
  });

  useEffect(() => {
    if (!user) {
      setUser(data || null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, user]);

  return (
    <View flex={1} p={2}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text fontWeight="bold" fontSize="xl">
          Welcome, {data?.firstName}!
        </Text>
      )}
    </View>
  );
};
