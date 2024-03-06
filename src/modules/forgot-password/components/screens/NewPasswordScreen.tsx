import React, { FC } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik, FormikHelpers } from 'formik';

import { useResetPassword } from 'hooks/forgot-password/useResetPassword';
import { AsyncStorageKeys } from 'libs/utils/constants';
import { PasswordObj } from 'modules/forgot-password/utils/types';
import { createPasswordValidationSchema } from 'modules/forgot-password/utils/validation';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { NewPasswordForm } from 'modules/forgot-password/components/common/NewPassword/NewPasswordForm';

const initialValues: PasswordObj = {
  password: '',
  confirmPassword: '',
};

export const NewPasswordScreen: FC = () => {
  const { mutate } = useResetPassword();

  const handleSubmit = async (
    values: PasswordObj,
    { setSubmitting }: FormikHelpers<PasswordObj>,
  ): Promise<void> => {
    const token = await AsyncStorage.getItem(
      AsyncStorageKeys.verificationToken,
    );

    const userId = await AsyncStorage.getItem(AsyncStorageKeys.userId);

    mutate({
      ...values,
      userId: Number(userId),
      resetToken: String(token),
    });

    setSubmitting(false);
  };

  return (
    <ForgotPasswordWrapper title="Now you can create new password!">
      <Formik
        initialValues={initialValues}
        validationSchema={createPasswordValidationSchema}
        onSubmit={handleSubmit}
      >
        <NewPasswordForm />
      </Formik>
    </ForgotPasswordWrapper>
  );
};
