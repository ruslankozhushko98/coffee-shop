import React, { FC } from 'react';
import { Text, View } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { useVerifyAccount } from 'hooks/account/useVerifyAccount';
import { useGlobalContext } from 'contexts/globalContext';
import { VerificationCodeInitialValues } from 'modules/account/utils/types';
import { accountVerificationSchema } from 'modules/account/utils/validation';
import { AccountVerificationForm } from 'modules/account/components/common/AccountVerificationForm';

const initialValues: VerificationCodeInitialValues = {
  code: '',
};

export const AccountVerificationScreen: FC = () => {
  const { user } = useGlobalContext();
  const { mutate } = useVerifyAccount();

  const handleSubmit = (
    values: VerificationCodeInitialValues,
    { setSubmitting }: FormikHelpers<VerificationCodeInitialValues>,
  ): void => {
    mutate({
      code: values.code,
      userId: Number(user?.id),
    });

    setSubmitting(false);
  };

  return (
    <View p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        Verification code has been sent to your email!
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={accountVerificationSchema}
        onSubmit={handleSubmit}
      >
        <AccountVerificationForm />
      </Formik>
    </View>
  );
};
