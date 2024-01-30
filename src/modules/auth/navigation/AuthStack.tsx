import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Screens } from 'libs/utils/constants';
import { LoginScreen } from 'modules/auth/screens/LoginScreen';

const AuthNavigationStack = createStackNavigator();

export const AuthStack: FC = () => {
  return (
    <AuthNavigationStack.Navigator
      initialRouteName={Screens.AUTH_STACK.LOGIN_SCREEN}
    >
      <AuthNavigationStack.Screen
        name={Screens.AUTH_STACK.LOGIN_SCREEN}
        component={LoginScreen}
      />
    </AuthNavigationStack.Navigator>
  );
};
