/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';

import { GlobalContextProvider } from 'contexts/globalContext';
import { queryClient } from 'libs/utils/config';
import { Screens } from 'libs/utils/constants';
import { SignInScreen } from 'modules/auth/components/screens/SignInScreen';
import { SignUpScreen } from 'modules/auth/components/screens/SignUpScreen';
import { SignUpLink } from 'modules/auth/components/layout/SignUpLink';
import { SignInLink } from 'modules/auth/components/layout/SignInLink';
import { AccountActivationScreen } from 'modules/account/components/screens/AccountActivationScreen';
import { ForgotPasswordStack } from 'modules/forgot-password/navigation/ForgotPasswordStack';
import { HomeStack } from 'modules/home/navigation/HomeStack';

const RootNavigationStack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const style = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={style}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={style.backgroundColor}
        />

        <NativeBaseProvider>
          <NavigationContainer>
            <GlobalContextProvider>
              <RootNavigationStack.Navigator
                initialRouteName={Screens.SIGN_IN_SCREEN}
              >
                <RootNavigationStack.Screen
                  name={Screens.SIGN_IN_SCREEN}
                  component={SignInScreen}
                  options={{
                    title: 'Sign in to get stars!',
                    headerRight: () => <SignUpLink />,
                  }}
                />

                <RootNavigationStack.Screen
                  name={Screens.SIGN_UP_SCREEN}
                  component={SignUpScreen}
                  options={{
                    title: 'Sign up to get stars!',
                    headerLeft: () => <SignInLink />,
                  }}
                />

                <RootNavigationStack.Screen
                  name={Screens.ACCOUNT_ACTIVATION}
                  component={AccountActivationScreen}
                  options={{
                    title: 'Activate your account',
                  }}
                />

                <RootNavigationStack.Screen
                  name={Screens.HOME_STACK}
                  component={HomeStack}
                  options={{
                    gestureEnabled: false,
                    headerShown: false,
                  }}
                />

                <RootNavigationStack.Screen
                  name={Screens.FORGOT_PASSWORD_STACK}
                  component={ForgotPasswordStack}
                  options={{
                    headerShown: false,
                  }}
                />
              </RootNavigationStack.Navigator>
            </GlobalContextProvider>
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
