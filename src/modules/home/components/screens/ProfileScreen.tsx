import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';

import { Screens } from 'libs/utils/constants';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';

export const ProfileScreen: FC = () => {
  const { navigate } = useNavigation();

  const handleGoToLogin = (): void => {
    navigate(Screens.SIGN_IN_SCREEN);
  };

  return (
    <HomeLayout>
      <Text fontWeight="bold" fontSize="xl">
        Login to see your account details!
      </Text>

      <View flexDirection="row" mt={2}>
        <Text fontSize="xl">Go to</Text>

        <Button variant="ghost" onPress={handleGoToLogin} size="md" py={0}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.600"
            textDecorationLine="underline"
          >
            Login
          </Text>
        </Button>
      </View>
    </HomeLayout>
  );
};
