import React, { FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackHeaderProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Box, Text, Button } from 'native-base';

import { useGlobalContext } from 'contexts/globalContext';
import { Screens } from 'libs/utils/constants';

export const Header: FC<StackHeaderProps> = () => {
  const { navigate } = useNavigation();
  const { setUser } = useGlobalContext();

  const handleLogout = async (): Promise<void> => {
    await AsyncStorage.removeItem('access_token');
    navigate(Screens.SIGN_IN_SCREEN);
    setUser(null);
  };

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      px="2"
      py="2"
      bgColor="blueGray.400"
    >
      <Text>Coffee</Text>

      <Button variant="link" onPress={handleLogout}>
        <Text>Log out</Text>
      </Button>
    </Box>
  );
};
