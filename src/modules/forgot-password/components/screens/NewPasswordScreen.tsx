import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';

import { Screens } from 'libs/utils/constants';
import { PasswordObj } from 'modules/forgot-password/utils/types';
import { createPasswordValidationSchema } from 'modules/forgot-password/utils/validation';
import { ForgotPasswordWrapper } from 'modules/forgot-password/layout/ForgotPasswordWrapper';
import { NewPasswordForm } from 'modules/forgot-password/components/common/NewPassword/NewPasswordForm';

const initialValues: PasswordObj = {
  password: '',
  confirmPassword: '',
};

export const NewPasswordScreen: FC = () => {
  const { navigate } = useNavigation();

  const handleSubmit = (
    values: PasswordObj,
    { setSubmitting }: FormikHelpers<PasswordObj>,
  ): void => {
    setSubmitting(false);
    navigate(Screens.HOME_SCREEN);
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
