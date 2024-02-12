import React, { FC } from 'react';
import { Keyboard } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { Formik, FormikHelpers } from 'formik';

import { AsyncStorageKeys, Mutations, Screens } from 'libs/utils/constants';
import { loginValidationSchema } from 'modules/auth/utils/validation';
import { SignInDto } from 'modules/auth/utils/types';
import { authService } from 'modules/auth/services';
import { LoginFields } from 'modules/auth/components/common/Login/LoginFields';
import { useKeyboardOpened } from 'hooks/useKeyboardOpened';

const initialValues: SignInDto = {
  email: '',
  password: '',
};

export const LoginScreen: FC = () => {
  const { navigate } = useNavigation();
  const isKeyboardOpened = useKeyboardOpened();
  const { mutate } = useMutation({
    mutationKey: [Mutations.SIGN_IN],
    mutationFn: authService.signIn,
    async onSuccess({ data }) {
      await AsyncStorage.setItem(
        AsyncStorageKeys.accessToken,
        data.accessToken,
      );

      navigate(Screens.HOME_SCREEN);
    },
    onSettled() {
      if (isKeyboardOpened) {
        Keyboard.dismiss();
      }
    },
    onError(error) {
      Toast.show({
        type: 'error',
        text1: 'Sign in error',
        text2: error.message,
        autoHide: false,
      });
    },
  });

  const handleSubmit = (
    values: SignInDto,
    { setSubmitting }: FormikHelpers<SignInDto>,
  ): void => {
    mutate(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      <LoginFields />
    </Formik>
  );
};
