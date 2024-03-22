import React, { FC } from 'react';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import { Box, Text } from 'native-base';

import { useGlobalContext } from 'contexts/globalContext';

export const Header: FC<BottomTabHeaderProps> = () => {
  const { user } = useGlobalContext();

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
        Welcome, {user?.firstName}!
      </Text>
    </Box>
  );
};
