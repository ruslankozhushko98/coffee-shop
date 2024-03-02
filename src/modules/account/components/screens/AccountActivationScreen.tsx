import React, { FC } from 'react';
import { Text, View } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { useActivateAccount } from 'hooks/account/useActivateAccount';
import { useGlobalContext } from 'contexts/globalContext';
import { VerificationCodeInitialValues } from 'modules/account/utils/types';
import { accountVerificationSchema } from 'modules/account/utils/validation';
import { AccountActivationForm } from 'modules/account/components/common/AccountActivationForm';

const initialValues: VerificationCodeInitialValues = {
  code: '',
};

export const AccountActivationScreen: FC = () => {
  const { user } = useGlobalContext();
  const { mutate } = useActivateAccount();

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
        Activation code has been sent to your email!
      </Text>

      <Formik
        initialValues={initialValues}
        validationSchema={accountVerificationSchema}
        onSubmit={handleSubmit}
      >
        <AccountActivationForm />
      </Formik>
    </View>
  );
};
