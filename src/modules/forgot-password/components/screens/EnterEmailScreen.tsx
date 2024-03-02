import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { Screens } from 'libs/utils/constants';
import { enterEmailValidationSchema } from 'modules/forgot-password/utils/validation';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { EnterEmailForm } from 'modules/forgot-password/components/common/EnterEmail/EnterEmailForm';

export const EnterEmailScreen: FC = () => {
  const { navigate } = useNavigation();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSubmit = (values: { email: string }): void => {
    navigate(Screens.FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN);
  };

  return (
    <ForgotPasswordWrapper title="Enter your email so we could send verification code!">
      <Formik
        initialValues={{ email: '' }}
        validationSchema={enterEmailValidationSchema}
        onSubmit={handleSubmit}
      >
        <EnterEmailForm />
      </Formik>
    </ForgotPasswordWrapper>
  );
};
