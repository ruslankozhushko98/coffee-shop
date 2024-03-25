import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formik, FormikHelpers } from 'formik';

import { useVerifyAccount } from 'hooks/account/useVerifyAccount';
import { AsyncStorageKeys } from 'libs/utils/constants';
import { VerificationCodeInitialValues } from 'modules/account/utils/types';
import { verificationCodeValidationSchema } from 'modules/forgot-password/utils/validation';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { AccountVerificationForm } from 'modules/forgot-password/components/common/AccountVerification/AccountVerificationForm';

const initialValues: VerificationCodeInitialValues = {
  code: '',
};

export const AccountVerificationScreen: FC = () => {
  const { t } = useTranslation();
  const { mutateAsync } = useVerifyAccount();

  const handleSubmit = async (
    values: VerificationCodeInitialValues,
    { setSubmitting }: FormikHelpers<VerificationCodeInitialValues>,
  ): Promise<void> => {
    const userId = await AsyncStorage.getItem(AsyncStorageKeys.userId);

    await mutateAsync({
      ...values,
      userId: Number(userId),
    });

    setSubmitting(false);
  };

  return (
    <ForgotPasswordWrapper
      title={t('forgotPassword:accountVerificationScreen:title')}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={verificationCodeValidationSchema}
        onSubmit={handleSubmit}
      >
        <AccountVerificationForm />
      </Formik>
    </ForgotPasswordWrapper>
  );
};
