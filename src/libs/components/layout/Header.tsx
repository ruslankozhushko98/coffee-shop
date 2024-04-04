import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';

import { useUserSelector } from 'modules/auth/store/authSelectors';

export const Header: FC<BottomTabHeaderProps> = () => {
  const { t } = useTranslation();
  const user = useUserSelector();

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
    </Box>
  );
};
