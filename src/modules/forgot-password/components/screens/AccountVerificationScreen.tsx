import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';

import { Screens } from 'libs/utils/constants';
import { VerificationCodeInitialValues } from 'modules/account/utils/types';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { AccountVerificationForm } from 'modules/forgot-password/components/common/AccountVerification/AccountVerificationForm';

const initialValues: VerificationCodeInitialValues = {
  code: '',
};

export const AccountVerificationScreen: FC = () => {
  const { navigate } = useNavigation();

  const handleSubmit = (
    values: VerificationCodeInitialValues,
    { setSubmitting }: FormikHelpers<VerificationCodeInitialValues>,
  ): void => {
    navigate(Screens.FORGOT_PASSWORD_NEW_PASSWORD_SCREEN);
    setSubmitting(false);
  };

  return (
    <ForgotPasswordWrapper title="Verification code has been sent to your email!">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <AccountVerificationForm />
      </Formik>
    </ForgotPasswordWrapper>
  );
};
