import React, { FC, useEffect } from 'react';
import { Text, View } from 'native-base';
import { useQuery } from '@tanstack/react-query';

import { useBiometrics } from 'hooks/useBiometrics';
import { useGlobalContext } from 'contexts/globalContext';
import { Queries } from 'libs/utils/constants';
import { authService } from 'modules/auth/services';

export const HomeScreen: FC = () => {
  const { setUser, user } = useGlobalContext();
  const { setupBiometrics, isBiometricSetup } = useBiometrics();

  const { isLoading, data } = useQuery({
    queryKey: [Queries.FETCH_ME],
    queryFn: authService.fetchMe,
  });

  useEffect(() => {
    setUser(data || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!isBiometricSetup && user) {
      setupBiometrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBiometricSetup, user]);

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
