import { Dimensions } from 'react-native';

export const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const Screens = {
  AUTH_STACK: {
    INDEX: 'AUTH_STACK',
    LOGIN_SCREEN: 'LOGIN_SCREEN',
    REGISTER_SCREEN: 'REGISTER_SCREEN',
  },
  HOME_SCREEN: 'HOME_SCREEN',
};
