import React from 'react';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Text, useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { useBiometrics } from 'hooks/useBiometrics';
import { AsyncStorageKeys, Mutations, Screens } from 'libs/utils/constants';
import { authService } from 'modules/auth/services';

export const useSignUp = () => {
  const { navigate } = useNavigation();
  const isKeyboardOpened = useKeyboardOpened();
  const toast = useToast();
  const { setupBiometrics } = useBiometrics();

  return useMutation({
    mutationKey: [Mutations.SIGN_UP],
    mutationFn: authService.signUp,
    async onSuccess({ accessToken }) {
      await AsyncStorage.setItem(AsyncStorageKeys.accessToken, accessToken);

      navigate(Screens.HOME_STACK);
      setupBiometrics();
    },
    onSettled() {
      if (isKeyboardOpened) {
        Keyboard.dismiss();
      }
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
