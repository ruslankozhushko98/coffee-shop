import React from 'react';
import { Text, useToast } from 'native-base';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKeys, Mutations, Screens } from 'libs/utils/constants';
import { accountService } from 'modules/account/services';

export const useRequestAccountVerification = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  return useMutation({
    mutationKey: [Mutations.REQUEST_ACCOUNT_VERIFICATION],
    mutationFn: accountService.requestAccountVerification,
    async onSuccess({ message, userId }) {
      await AsyncStorage.setItem(AsyncStorageKeys.userId, String(userId));

      toast.show({
        placement: 'bottom',
        title: (
          <Text color="white" fontWeight="bold">
            {message}
          </Text>
        ),
        style: {
          backgroundColor: 'green',
        },
      });

      navigate(Screens.FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN);
    },
    onError(error) {
      toast.show({
        placement: 'bottom',
        title: (
          <Text color="white" fontWeight="bold">
            {error.message}
          </Text>
        ),
        style: {
          backgroundColor: 'red',
        },
      });
    },
  });
};
