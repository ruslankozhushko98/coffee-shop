import { Dimensions } from 'react-native';

export const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export enum Screens {
  AUTH_STACK = 'AUTH_STACK',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  REGISTER_SCREEN = 'REGISTER_SCREEN',

  HOME_SCREEN = 'HOME_SCREEN',
}

export enum Queries {
  FETCH_ME = 'FETCH_ME',
}

export enum Mutations {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
}

export enum AsyncStorageKeys {
  accessToken = 'access_token',
}
