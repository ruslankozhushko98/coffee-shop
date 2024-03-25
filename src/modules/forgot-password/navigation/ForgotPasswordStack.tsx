import React, { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import { Screens } from 'libs/utils/constants';
import { BackLink } from 'modules/auth/components/layout/BackLink';
import { EnterEmailScreen } from 'modules/forgot-password/components/screens/EnterEmailScreen';
import { AccountVerificationScreen } from 'modules/forgot-password/components/screens/AccountVerificationScreen';
import { NewPasswordScreen } from 'modules/forgot-password/components/screens/NewPasswordScreen';

const ForgotPasswordNavigator = createStackNavigator();

export const ForgotPasswordStack: FC = () => {
  const { t } = useTranslation();

  return (
    <ForgotPasswordNavigator.Navigator
      initialRouteName={Screens.FORGOT_PASSWORD_ENTER_EMAIL_SCREEN}
      screenOptions={{
        title: t('forgotPassword:header:title'),
        // eslint-disable-next-line react/no-unstable-nested-components
        headerLeft: () => <BackLink />,
      }}
    >
      <ForgotPasswordNavigator.Screen
        name={Screens.FORGOT_PASSWORD_ENTER_EMAIL_SCREEN}
        component={EnterEmailScreen}
      />

      <ForgotPasswordNavigator.Screen
        name={Screens.FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN}
        component={AccountVerificationScreen}
      />

      <ForgotPasswordNavigator.Screen
        name={Screens.FORGOT_PASSWORD_NEW_PASSWORD_SCREEN}
        component={NewPasswordScreen}
      />
    </ForgotPasswordNavigator.Navigator>
  );
};
