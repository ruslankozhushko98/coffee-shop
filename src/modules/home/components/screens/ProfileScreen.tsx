import React, { FC } from 'react';
import { Text } from 'native-base';

import { HomeLayout } from 'modules/home/components/layout/HomeLayout';

export const ProfileScreen: FC = () => {
  return (
    <HomeLayout>
      <Text fontWeight="bold" fontSize="xl">
        ProfileScreen
      </Text>
    </HomeLayout>
  );
};
