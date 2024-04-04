/* eslint-disable react-native/no-color-literals */
import { StyleSheet } from 'react-native';

import { normalize } from 'libs/utils/helpers';

export const styles = StyleSheet.create({
  tabBarIndicatorStyle: {
    backgroundColor: '#059669',
    borderWidth: 5,
  },
  tabBarStyle: {
    backgroundColor: 'white',
  },
  tabBarLabelStyle: {
    color: '#059669',
    fontWeight: '700',
    fontSize: normalize(13),
  },
});
