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

import { queryClient } from './src/libs/utils/config';
import { Screens } from './src/libs/utils/constants';
import { AuthStack } from './src/modules/auth/navigation/AuthStack';
import { HomeScreen } from './src/modules/home/components/screens/HomeScreen';

const RootNavigationStack = createStackNavigator();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <NativeBaseProvider>
          <NavigationContainer>
            <RootNavigationStack.Navigator
              initialRouteName={Screens.HOME_SCREEN}
            >
              <RootNavigationStack.Screen
                name={Screens.HOME_SCREEN}
                component={HomeScreen}
              />

              <RootNavigationStack.Screen
                name={Screens.AUTH_STACK.INDEX}
                component={AuthStack}
              />
            </RootNavigationStack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
