import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'native-base';

import { Screens } from 'libs/utils/constants';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';

export const ProfileScreen: FC = () => {
  const { navigate } = useNavigation();
  const { t } = useTranslation();

  const handleGoToSignIn = (): void => navigate(Screens.SIGN_IN_SCREEN);

  return (
    <HomeLayout>
      <Text fontWeight="bold" fontSize="xl">
        {t('profile:signInToSee')}
      </Text>

      <View flexDirection="row" mt={2}>
        <Text fontSize="xl">{t('profile:goTo')}</Text>

        <Button variant="ghost" onPress={handleGoToSignIn} size="md" py={0}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.600"
            textDecorationLine="underline"
          >
            {t('profile:signInLink')}
          </Text>
        </Button>
      </View>
    </HomeLayout>
  );
};
