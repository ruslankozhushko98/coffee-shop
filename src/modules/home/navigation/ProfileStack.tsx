import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { Screens } from 'libs/utils/constants';
import { BackLink } from 'modules/auth/components/layout/BackLink';
import { ProfileScreen } from 'modules/home/components/screens/Profile/ProfileScreen';
import { ProfileInfoScreen } from 'modules/home/components/screens/Profile/ProfileInfoScreen';

const ProfileNavigationStack = createStackNavigator();

export const ProfileStack: FC = () => {
  const { t } = useTranslation();

  return (
    <ProfileNavigationStack.Navigator initialRouteName={Screens.PROFILE_STACK}>
      <ProfileNavigationStack.Screen
        name={Screens.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          title: t('profile:title'),
        }}
      />

      <ProfileNavigationStack.Screen
        name={Screens.PROFILE_INFO_SCREEN}
        component={ProfileInfoScreen}
        options={{
          title: t('profileInfo:title'),
          // eslint-disable-next-line react/no-unstable-nested-components
          headerLeft: () => <BackLink />,
        }}
      />
    </ProfileNavigationStack.Navigator>
  );
};
