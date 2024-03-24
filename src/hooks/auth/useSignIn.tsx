import React from 'react';
import { Keyboard } from 'react-native';
import { Text, useToast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { useBiometrics } from 'hooks/useBiometrics';
import { useGlobalContext } from 'contexts/globalContext';
import { AsyncStorageKeys, Mutations, Screens } from 'libs/utils/constants';
import { authService } from 'modules/auth/services';

export const useSignIn = () => {
  const { navigate } = useNavigation();
  const isKeyboardOpened = useKeyboardOpened();
  const toast = useToast();
  const { setUser } = useGlobalContext();
  const { setupBiometrics, isBiometricSetup } = useBiometrics();

  return useMutation({
    mutationKey: [Mutations.SIGN_IN],
    mutationFn: authService.signIn,
    async onSuccess({ accessToken, user }) {
      await AsyncStorage.setItem(AsyncStorageKeys.accessToken, accessToken);

      if (user.isActivated) {
        navigate(Screens.HOME_STACK, { screen: Screens.HOME_SCREEN });
      } else {
        navigate(Screens.ACCOUNT_ACTIVATION);
      }

      setUser(user);

      if (!isBiometricSetup) {
        setupBiometrics();
      }
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
