/* eslint-disable indent */
import React, { FC, ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'native-base';

import { useFetchMe } from 'hooks/auth/useFetchMe';
import { Screens } from 'libs/utils/constants';
import { normalize } from 'libs/utils/helpers';
import { Loading } from 'libs/components/layout/Loading';
import { Header } from 'libs/components/layout/Header';
import { HomeScreen } from 'modules/home/components/screens/HomeScreen';
import { OrdersScreen } from 'modules/home/components/screens/OrdersScreen';
import { ProfileScreen } from 'modules/home/components/screens/ProfileScreen';

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
  const { isLoading } = useFetchMe();

  return (
    <>
      {isLoading && <Loading backgroundColor="white" />}

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
            tabBarLabel: renderTabBarLabel('Home'),
          }}
        />

        <Tab.Screen
          name={Screens.HOME_ORDERS_SCREEN}
          component={OrdersScreen}
          options={{
            tabBarIcon: renderTabBarIcon('receipt'),
            tabBarLabel: renderTabBarLabel('Orders'),
          }}
        />

        <Tab.Screen
          name={Screens.HOME_PROFILE_SCREEN}
          component={ProfileScreen}
          options={{
            tabBarIcon: renderTabBarIcon('account-circle'),
            tabBarLabel: renderTabBarLabel('Profile'),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
