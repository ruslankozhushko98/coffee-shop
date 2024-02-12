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
import { Header } from 'libs/components/layout/Header';
import { SignInScreen } from 'modules/auth/components/screens/SignInScreen';
import { SignUpScreen } from 'modules/auth/components/screens/SignUpScreen';
import { HomeScreen } from 'modules/home/components/screens/HomeScreen';

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
                    gestureEnabled: false,
                    headerLeft: () => null,
                  }}
                />

                <RootNavigationStack.Screen
                  name={Screens.SIGN_UP_SCREEN}
                  component={SignUpScreen}
                  options={{
                    title: 'Sign up to get stars!',
                    gestureEnabled: false,
                    headerLeft: () => null,
                  }}
                />

                <RootNavigationStack.Screen
                  name={Screens.HOME_SCREEN}
                  component={HomeScreen}
                  options={{
                    gestureEnabled: false,
                    // eslint-disable-next-line react/no-unstable-nested-components
                    header: props => <Header {...props} />,
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
