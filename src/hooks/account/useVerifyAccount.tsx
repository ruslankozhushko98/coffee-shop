import React from 'react';
import { useToast, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKeys, Mutations, Screens } from 'libs/utils/constants';
import { accountService } from 'modules/account/services';

export const useVerifyAccount = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  return useMutation({
    mutationKey: [Mutations.VERIFY_ACCOUNT],
    mutationFn: accountService.verifyAccount,
    async onSuccess({ token, userId }) {
      await AsyncStorage.setItem(AsyncStorageKeys.verificationToken, token);
      await AsyncStorage.setItem(AsyncStorageKeys.userId, String(userId));

      toast.show({
        placement: 'bottom',
        title: (
          <Text color="white" fontWeight="bold">
            Account verified successfully!
          </Text>
        ),
        style: {
          backgroundColor: 'green',
        },
      });

      navigate(Screens.FORGOT_PASSWORD_NEW_PASSWORD_SCREEN);
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
