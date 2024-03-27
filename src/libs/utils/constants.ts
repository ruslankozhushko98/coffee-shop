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
  HOME_ORDERS_SCREEN = 'ORDERS_SCREEN',
  HOME_PROFILE_SCREEN = 'PROFILE_SCREEN',

  FORGOT_PASSWORD_STACK = 'FORGOT_PASSWORD_STACK',
  FORGOT_PASSWORD_ENTER_EMAIL_SCREEN = 'FORGOT_PASSWORD_ENTER_EMAIL_SCREEN',
  FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN = 'FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN',
  FORGOT_PASSWORD_NEW_PASSWORD_SCREEN = 'FORGOT_PASSWORD_NEW_PASSWORD_SCREEN',
}

export enum Queries {
  FETCH_ME = 'FETCH_ME',
  FETCH_BEVERAGES = 'FETCH_BEVERAGES',
  FETCH_BEVERAGE_BY_ID = 'FETCH_BEVERAGE_BY_ID',
}

export enum Mutations {
  SIGN_IN = 'SIGN_IN',
  SIGN_UP = 'SIGN_UP',
  ACTIVATE_ACCOUNT = 'ACTIVATE_ACCOUNT',
  VERIFY_ACCOUNT = 'VERIFY_ACCOUNT',
  REQUEST_ACCOUNT_VERIFICATION = 'REQUEST_ACCOUNT_VERIFICATION',
  RESET_PASSWORD = 'RESET_PASSWORD',
  TOGGLE_BEVERAGE_FAVORITE = 'TOGGLE_BEVERAGE_FAVORITE',
  EDIT_PROFILE = 'EDIT_PROFILE',
}

export enum AsyncStorageKeys {
  accessToken = 'access_token',
  verificationToken = 'verification_token',
  userId = 'user_id',
  biometryType = 'biometry_type',
  lang = 'lang',
}
