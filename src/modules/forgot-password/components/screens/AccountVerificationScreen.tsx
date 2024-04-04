import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Text, useToast } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { useVerifyAccountMutation } from 'modules/account/store/accountApi';
import { VerificationCodeInitialValues } from 'modules/account/utils/types';
import { verificationCodeValidationSchema } from 'modules/forgot-password/utils/validation';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { AccountVerificationForm } from 'modules/forgot-password/components/common/AccountVerification/AccountVerificationForm';

const initialValues: VerificationCodeInitialValues = {
  code: '',
};

export const AccountVerificationScreen: FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const toast = useToast();
  const [verifyAccount, { data, isSuccess }] = useVerifyAccountMutation();

  useEffect(() => {
    if (isSuccess && data) {
      (async () => {
        await AsyncStorage.setItem(
          AsyncStorageKeys.verificationToken,
          String(data?.token),
        );

        await AsyncStorage.setItem(
          AsyncStorageKeys.userId,
          String(data?.userId),
        );

        toast.show({
          placement: 'bottom',
          title: (
            <Text color="white" fontWeight="bold">
              {t('accountVerificationScreen:successMessage')}
            </Text>
          ),
          style: {
            backgroundColor: 'green',
          },
        });

        navigate(Screens.FORGOT_PASSWORD_NEW_PASSWORD_SCREEN);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.token, data?.userId, isSuccess]);

  const handleSubmit = async (
    values: VerificationCodeInitialValues,
    { setSubmitting }: FormikHelpers<VerificationCodeInitialValues>,
  ): Promise<void> => {
    const userId = await AsyncStorage.getItem(AsyncStorageKeys.userId);

    await verifyAccount({
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
