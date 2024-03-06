import React from 'react';
import { Text, useToast } from 'native-base';
import { useMutation } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AsyncStorageKeys, Mutations, Screens } from 'libs/utils/constants';
import { forgotPasswordService } from 'modules/forgot-password/services';

export const useResetPassword = () => {
  const { navigate } = useNavigation();
  const toast = useToast();

  return useMutation({
    mutationKey: [Mutations.RESET_PASSWORD],
    mutationFn: forgotPasswordService.resetPassword,
    async onSuccess() {
      await AsyncStorage.removeItem(AsyncStorageKeys.verificationToken);

      toast.show({
        placement: 'bottom',
        title: (
          <Text color="white" fontWeight="bold">
            Password reset successfully!
          </Text>
        ),
        style: {
          backgroundColor: 'green',
        },
      });

      navigate(Screens.SIGN_IN_SCREEN);
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
