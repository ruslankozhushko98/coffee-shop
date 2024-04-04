import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, View } from 'native-base';

import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { setUser } from 'modules/auth/store/authSlice';

export const ProfileBottomButtons: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { navigate } = useNavigation();

  const handleSignOut = async (): Promise<void> => {
    await AsyncStorage.removeItem(AsyncStorageKeys.accessToken);
    navigate(Screens.SIGN_IN_SCREEN);
    dispatch(setUser(null));
  };

  const handleGoToForgotPassword = (): void =>
    navigate(Screens.FORGOT_PASSWORD_STACK);

  return (
    <View>
      <Button
        variant="outline"
        borderColor="amber.600"
        borderWidth="2"
        rounded="xl"
        onPress={handleGoToForgotPassword}
        mb={5}
      >
        <Text
          color="amber.600"
          fontWeight="bold"
          fontSize="xl"
          textTransform="uppercase"
        >
          {t('links:forgotPassword')}
        </Text>
      </Button>

      <Button
        variant="outline"
        borderColor="tertiary.600"
        borderWidth="2"
        rounded="xl"
        onPress={handleSignOut}
      >
        <Text
          color="tertiary.600"
          fontWeight="bold"
          fontSize="xl"
          textTransform="uppercase"
        >
          {t('links:signOut')}
        </Text>
      </Button>
    </View>
  );
};
