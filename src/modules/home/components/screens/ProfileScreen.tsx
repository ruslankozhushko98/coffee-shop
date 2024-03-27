import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'native-base';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { useGlobalContext } from 'contexts/globalContext';
import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';
import { SignInToSee } from 'modules/home/components/common/Profile/SignInToSee';
import { ProfileInfo } from 'modules/home/components/common/Profile/ProfileInfo/ProfileInfo';

export const ProfileScreen: FC = () => {
  const { t } = useTranslation();
  const isKeyboardOpened = useKeyboardOpened();
  const { navigate } = useNavigation();
  const { user, setUser } = useGlobalContext();

  const handleSignOut = async (): Promise<void> => {
    await AsyncStorage.removeItem(AsyncStorageKeys.accessToken);
    navigate(Screens.SIGN_IN_SCREEN);
    setUser(null);
  };

  const handleGoToForgotPassword = (): void =>
    navigate(Screens.FORGOT_PASSWORD_STACK);

  return (
    <HomeLayout>
      {user ? (
        <View flex={1} justifyContent="space-between" pb="12">
          <ProfileInfo />

          {!isKeyboardOpened && (
            <>
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
            </>
          )}
        </View>
      ) : (
        <SignInToSee />
      )}
    </HomeLayout>
  );
};
