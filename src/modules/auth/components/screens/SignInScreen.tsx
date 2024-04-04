import React, { FC, useEffect } from 'react';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { useBiometrics } from 'hooks/useBiometrics';
import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { useSignInMutation } from 'modules/auth/store/authApi';
import { SignInDto } from 'modules/auth/utils/types';
import { signInValidationSchema } from 'modules/auth/utils/validation';
import { SignInFields } from 'modules/auth/components/common/SignIn/SignInFields';

const initialValues: SignInDto = {
  email: 'gajshenec@gmail.com',
  password: 'Secret1!',
};

export const SignInScreen: FC = () => {
  const { navigate } = useNavigation();
  const [signIn, { isSuccess, data }] = useSignInMutation();
  const isKeyboardOpened = useKeyboardOpened();
  const { setupBiometrics, isBiometricSetup } = useBiometrics();

  useEffect(() => {
    if (isSuccess && data) {
      (async () => {
        await AsyncStorage.setItem(
          AsyncStorageKeys.accessToken,
          data.accessToken,
        );

        if (data.user.isActivated) {
          navigate(Screens.HOME_STACK, { screen: Screens.HOME_SCREEN });
        } else {
          navigate(Screens.ACCOUNT_ACTIVATION);
        }

        if (!isBiometricSetup) {
          setupBiometrics();
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, data]);

  const handleSubmit = async (
    values: SignInDto,
    { setSubmitting }: FormikHelpers<SignInDto>,
  ): Promise<void> => {
    signIn(values);
    setSubmitting(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      justifyContent={isKeyboardOpened ? 'unset' : 'center'}
      flex={1}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={signInValidationSchema}
        onSubmit={handleSubmit}
      >
        <SignInFields />
      </Formik>
    </KeyboardAvoidingView>
  );
};
