import React, { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useVerifyAccount } from 'hooks/account/useVerifyAccount';
import { VerificationCodeInitialValues } from 'modules/account/utils/types';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { AccountVerificationForm } from 'modules/forgot-password/components/common/AccountVerification/AccountVerificationForm';
import { AsyncStorageKeys } from 'libs/utils/constants';

const initialValues: VerificationCodeInitialValues = {
  code: '',
};

export const AccountVerificationScreen: FC = () => {
  const { mutate } = useVerifyAccount();

  const handleSubmit = async (
    values: VerificationCodeInitialValues,
    { setSubmitting }: FormikHelpers<VerificationCodeInitialValues>,
  ): Promise<void> => {
    const userId = await AsyncStorage.getItem(AsyncStorageKeys.userId);

    mutate({
      ...values,
      userId: Number(userId),
    });

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
