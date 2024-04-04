import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { User } from 'modules/auth/models';
import { setUser } from 'modules/auth/store/authSlice';
import { useUserSelector } from 'modules/auth/store/authSelectors';
import { VerificationCodeInitialValues } from 'modules/account/utils/types';
import { accountVerificationSchema } from 'modules/account/utils/validation';
import { useActivateAccountMutation } from 'modules/account/store/accountApi';
import { AccountActivationForm } from 'modules/account/components/common/AccountActivationForm';

const initialValues: VerificationCodeInitialValues = {
  code: '',
};

export const AccountActivationScreen: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useUserSelector();
  const [activateAccount, { isSuccess }] = useActivateAccountMutation();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUser({
          ...user,
          isActivated: true,
        } as User),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleSubmit = async (
    values: VerificationCodeInitialValues,
    { setSubmitting }: FormikHelpers<VerificationCodeInitialValues>,
  ): Promise<void> => {
    await activateAccount({
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
