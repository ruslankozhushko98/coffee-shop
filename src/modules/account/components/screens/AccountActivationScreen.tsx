import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { user } = useGlobalContext();
  const { mutateAsync } = useActivateAccount();

  const handleSubmit = async (
    values: VerificationCodeInitialValues,
    { setSubmitting }: FormikHelpers<VerificationCodeInitialValues>,
  ): Promise<void> => {
    await mutateAsync({
      code: values.code,
      userId: Number(user?.id),
    });

    setSubmitting(false);
  };

  return (
    <View p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        {t('accountActivationScreen:title')}
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
