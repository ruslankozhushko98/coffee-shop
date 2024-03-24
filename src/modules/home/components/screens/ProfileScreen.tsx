import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'native-base';

import { Screens } from 'libs/utils/constants';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';

export const ProfileScreen: FC = () => {
  const { navigate } = useNavigation();

  const handleGoToSignIn = (): void => navigate(Screens.SIGN_IN_SCREEN);

  return (
    <HomeLayout>
      <Text fontWeight="bold" fontSize="xl">
        Sign in to see your account details!
      </Text>

      <View flexDirection="row" mt={2}>
        <Text fontSize="xl">Go to</Text>

        <Button variant="ghost" onPress={handleGoToSignIn} size="md" py={0}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.600"
            textDecorationLine="underline"
          >
            Sign in
          </Text>
        </Button>
      </View>
    </HomeLayout>
  );
};
