import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Box, Button, Text } from 'native-base';

import { useGlobalContext } from 'contexts/globalContext';
import { Screens } from 'libs/utils/constants';

export const Header: FC<BottomTabHeaderProps> = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { user } = useGlobalContext();

  const handleGoToSignIn = (): void => navigate(Screens.SIGN_IN_SCREEN);

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      px="2"
      py="2"
      backgroundColor="white"
    >
      <Text fontWeight="bold" fontSize="xl" color="tertiary.600">
        {t('header:title', { name: user?.firstName || t('header:guest') })}
      </Text>

      {!user && (
        <Button variant="ghost" onPress={handleGoToSignIn}>
          <Text fontWeight="bold" fontSize="lg" color="blue.600">
            {t('links:signIn')}
          </Text>
        </Button>
      )}
    </Box>
  );
};
