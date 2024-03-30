/* eslint-disable indent */
import React, { FC, ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { Text } from 'native-base';

import { useFetchMe } from 'hooks/auth/useFetchMe';
import { useGlobalContext } from 'contexts/globalContext';
import { Screens } from 'libs/utils/constants';
import { normalize } from 'libs/utils/helpers';
import { Loading } from 'libs/components/layout/Loading';
import { Header } from 'libs/components/layout/Header';
import { HomeScreen } from 'modules/home/components/screens/HomeScreen';
import { OrdersScreen } from 'modules/home/components/screens/OrdersScreen';
import { ProfileStack } from './ProfileStack';

type TabBarOptions = { [key: string]: any };

const Tab = createBottomTabNavigator();

const renderTabBarIcon =
  (iconName: string) =>
  ({ focused, color }: TabBarOptions): ReactNode =>
    (
      <Icon
        name={iconName}
        size={normalize(25)}
        color={focused ? '#059669' : color}
      />
    );

const renderTabBarLabel =
  (label: string) =>
  ({ focused, color }: TabBarOptions): ReactNode =>
    (
      <Text fontWeight="medium" color={focused ? '#059669' : color}>
        {label}
      </Text>
    );

export const HomeStack: FC = () => {
  const { t } = useTranslation();
  const { isLoading } = useFetchMe();
  const { isLanguageChanging } = useGlobalContext();

  return (
    <>
      {(isLoading || isLanguageChanging) && <Loading backgroundColor="white" />}

      <Tab.Navigator
        initialRouteName={Screens.HOME_SCREEN}
        screenOptions={{
          // eslint-disable-next-line react/no-unstable-nested-components
          header: props => <Header {...props} />,
        }}
      >
        <Tab.Screen
          name={Screens.HOME_SCREEN}
          component={HomeScreen}
          options={{
            tabBarIcon: renderTabBarIcon('home'),
            tabBarLabel: renderTabBarLabel(t('bottomTabs:home')),
          }}
        />

        <Tab.Screen
          name={Screens.ORDERS_SCREEN}
          component={OrdersScreen}
          options={{
            tabBarIcon: renderTabBarIcon('receipt'),
            tabBarLabel: renderTabBarLabel(t('bottomTabs:orders')),
          }}
        />

        <Tab.Screen
          name={Screens.PROFILE_STACK}
          component={ProfileStack}
          options={{
            tabBarIcon: renderTabBarIcon('account-circle'),
            tabBarLabel: renderTabBarLabel(t('bottomTabs:profile')),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
