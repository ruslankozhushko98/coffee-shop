import { Dimensions } from 'react-native';

export const PHONE_REGEX = /^\(\d{3}\) \d{3}-\d{4}$/;
export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const DATE_FORMAT = 'mmm dd yyyy';

export const SCREEN_WIDTH = Dimensions.get('screen').width;
export const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const DEBOUNCE_DELAY = 1500;

export enum Screens {
  SIGN_IN_SCREEN = 'SIGN_IN_SCREEN',
  SIGN_UP_SCREEN = 'SIGN_UP_SCREEN',

  ACCOUNT_ACTIVATION = 'ACCOUNT_ACTIVATION',

  HOME_STACK = 'HOME_STACK',
  HOME_SCREEN = 'HOME_SCREEN',

  MENU_TABS_STACK = 'MENU_TABS_STACK',
  MENU_ALL_TAB = 'MENU_ALL_TAB',
  MENU_FAVORITE_TAB = 'MENU_FAVORITE_TAB',

  ORDERS_SCREEN = 'ORDERS_SCREEN',

  PROFILE_STACK = 'PROFILE_STACK',
  PROFILE_SCREEN = 'PROFILE_SCREEN',
  PROFILE_INFO_SCREEN = 'PROFILE_INFO_SCREEN',

  FORGOT_PASSWORD_STACK = 'FORGOT_PASSWORD_STACK',
  FORGOT_PASSWORD_ENTER_EMAIL_SCREEN = 'FORGOT_PASSWORD_ENTER_EMAIL_SCREEN',
  FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN = 'FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN',
  FORGOT_PASSWORD_NEW_PASSWORD_SCREEN = 'FORGOT_PASSWORD_NEW_PASSWORD_SCREEN',
}

export enum API_TAG_TYPES {
  MENU = 'MENU',
  PROFILE = 'PROFILE',
  AUTH = 'AUTH',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export enum API_TAG_IDS {
  FETCH_ALL_BEVERAGES = 'FETCH_ALL_BEVERAGES',
  FETCH_FAVORITE_BEVERAGES = 'FETCH_FAVORITE_BEVERAGES',
  FETCH_BEVERAGE_BY_ID = 'FETCH_BEVERAGE_BY_ID',

  FETCH_ME = 'FETCH_ME',
}

export enum AsyncStorageKeys {
  accessToken = 'access_token',
  verificationToken = 'verification_token',
  userId = 'user_id',
  biometryType = 'biometry_type',
  lang = 'lang',
}

export enum LANGS {
  EN = 'en',
  RU = 'ru',
}
