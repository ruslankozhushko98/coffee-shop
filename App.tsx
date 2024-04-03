/* eslint-disable react/no-unstable-nested-components */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { NativeBaseProvider } from 'native-base';

import { GlobalContextProvider } from 'contexts/globalContext';
import { store } from 'libs/config/store';
import { queryClient } from 'libs/config/queryClient';
import { Screens } from 'libs/utils/constants';
import { SignInScreen } from 'modules/auth/components/screens/SignInScreen';
import { SignUpScreen } from 'modules/auth/components/screens/SignUpScreen';
import { SignUpLink } from 'modules/auth/components/layout/SignUpLink';
import { SignInLink } from 'modules/auth/components/layout/SignInLink';
import { BackLink } from 'modules/auth/components/layout/BackLink';
import { AccountActivationScreen } from 'modules/account/components/screens/AccountActivationScreen';
import { ForgotPasswordStack } from 'modules/forgot-password/navigation/ForgotPasswordStack';
import { HomeStack } from 'modules/home/navigation/HomeStack';

const RootNavigationStack = createStackNavigator();

function App(): React.JSX.Element {
  const { t } = useTranslation();
  const isDarkMode = useColorScheme() === 'dark';

  const style = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={style}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={style.backgroundColor}
          />

          <NativeBaseProvider>
            <NavigationContainer>
              <GlobalContextProvider>
                <RootNavigationStack.Navigator
                  initialRouteName={Screens.HOME_STACK}
                >
                  <RootNavigationStack.Screen
                    name={Screens.SIGN_IN_SCREEN}
                    component={SignInScreen}
                    options={{
                      title: t('auth:signInScreen:header:title'),
                      headerRight: () => <SignUpLink />,
                      headerLeft: () => <BackLink />,
                    }}
                  />

                  <RootNavigationStack.Screen
                    name={Screens.SIGN_UP_SCREEN}
                    component={SignUpScreen}
                    options={{
                      title: t('auth:signUpScreen:header:title'),
                      headerLeft: () => <SignInLink />,
                    }}
                  />

                  <RootNavigationStack.Screen
                    name={Screens.ACCOUNT_ACTIVATION}
                    component={AccountActivationScreen}
                    options={{
                      title: t('accountActivationScreen:header:title'),
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
        </Provider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
