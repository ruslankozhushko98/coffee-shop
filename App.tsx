/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClientProvider } from '@tanstack/react-query';
import { NativeBaseProvider } from 'native-base';

import { queryClient } from 'libs/utils/config';
import { Screens } from 'libs/utils/constants';
import { Header } from 'libs/components/layout/Header';
import { LoginScreen } from 'modules/auth/components/screens/LoginScreen';
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
            <RootNavigationStack.Navigator
              initialRouteName={Screens.LOGIN_SCREEN}
            >
              <RootNavigationStack.Screen
                name={Screens.LOGIN_SCREEN}
                component={LoginScreen}
                options={{
                  title: 'Sign in to get stars!',
                }}
              />

              <RootNavigationStack.Screen
                name={Screens.HOME_SCREEN}
                component={HomeScreen}
                options={{
                  header: (props) => <Header {...props} />,
                  gestureEnabled: false,
                }}
              />
            </RootNavigationStack.Navigator>

            <Toast />
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
