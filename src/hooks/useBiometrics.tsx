import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { BiometryType } from 'react-native-biometrics';
import { Text, useToast } from 'native-base';

import { useGlobalContext } from 'contexts/globalContext';
import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { rnBiometrics } from 'libs/utils/config';
import { authService } from 'modules/auth/services';

export const useBiometrics = () => {
  const { user } = useGlobalContext();
  const toast = useToast();
  const { navigate } = useNavigation();
  const [isBiometricSetup, setIsBiometricSetup] = useState<boolean>(false);
  const [biometricType, setBiometricType] = useState<BiometryType | null>(null);

  useEffect(() => {
    (async () => {
      const userId = await AsyncStorage.getItem(AsyncStorageKeys.userId);

      setIsBiometricSetup(Boolean(userId));

      const biometryType = await AsyncStorage.getItem(
        AsyncStorageKeys.biometryType,
      );

      if (biometryType) {
        setBiometricType(biometryType as BiometryType);
      }
    })();
  }, []);

  const setupBiometrics = async (): Promise<void> => {
    if (user?.id) {
      const { available, biometryType } =
        await rnBiometrics.isSensorAvailable();

      if (available) {
        Alert.alert(
          String(biometryType),
          `Would you like to enable ${biometryType} authentication for future?`,
          [
            {
              text: 'Yes',
              onPress: async () => {
                const { publicKey } = await rnBiometrics.createKeys();

                await authService.createPublicKey({
                  userId: Number(user?.id),
                  key: publicKey,
                });

                await AsyncStorage.setItem(
                  AsyncStorageKeys.userId,
                  String(user?.id),
                );

                await AsyncStorage.setItem(
                  AsyncStorageKeys.biometryType,
                  String(biometryType),
                );

                setIsBiometricSetup(true);
                setBiometricType(biometryType as BiometryType);
              },
            },
            {
              text: 'No',
              style: 'cancel',
            },
          ],
        );
      }
    }
  };

  const verifyBiometrics = async (): Promise<void> => {
    const userId = await AsyncStorage.getItem(AsyncStorageKeys.userId);

    if (userId) {
      const timestamp = Math.round(new Date().getTime() / 1000).toString();

      const payload = `${userId}__${timestamp}`;

      const { success, signature, error } = await rnBiometrics.createSignature({
        promptMessage: 'Sign in',
        payload,
      });

      if (success && signature) {
        const { accessToken } = await authService.authBiometric({
          signature,
          payload,
        });

        await AsyncStorage.setItem(AsyncStorageKeys.accessToken, accessToken);

        navigate(Screens.HOME_SCREEN);
      }

      if (error) {
        toast.show({
          placement: 'bottom',
          title: (
            <Text color="white" fontWeight="bold">
              {error}
            </Text>
          ),
          style: {
            backgroundColor: 'red',
          },
        });
      }
    }
  };

  return {
    isBiometricSetup,
    biometricType,
    setupBiometrics,
    verifyBiometrics,
  };
};
