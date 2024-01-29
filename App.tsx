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

import { queryClient } from './src/utils/config';
import { Screens } from './src/utils/constants';
import { HomeScreen } from './src/components/screens/HomeScreen';

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

        <NavigationContainer>
          <RootNavigationStack.Navigator initialRouteName={Screens.HOME_SCREEN}>
            <RootNavigationStack.Screen
              name={Screens.HOME_SCREEN}
              component={HomeScreen}
            />
          </RootNavigationStack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaView>
  );
}

export default App;
