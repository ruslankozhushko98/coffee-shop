import React, { FC } from 'react';
import { Platform } from 'react-native';
import { KeyboardAvoidingView } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { useSignIn } from 'hooks/auth/useSignIn';
import { loginValidationSchema } from 'modules/auth/utils/validation';
import { SignInDto } from 'modules/auth/utils/types';
import { SignInFields } from 'modules/auth/components/common/SignIn/SignInFields';

const initialValues: SignInDto = {
  email: 'asd@asd.asd',
  password: 'secret',
};

export const SignInScreen: FC = () => {
  const { mutate } = useSignIn();
  const isKeyboardOpened = useKeyboardOpened();

  const handleSubmit = async (
    values: SignInDto,
    { setSubmitting }: FormikHelpers<SignInDto>,
  ): Promise<void> => {
    mutate(values);
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
        validationSchema={loginValidationSchema}
        onSubmit={handleSubmit}
      >
        <SignInFields />
      </Formik>
    </KeyboardAvoidingView>
  );
};
