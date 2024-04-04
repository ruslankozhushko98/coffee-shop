import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, useToast } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { useLazyFetchMeQuery } from 'modules/auth/store/authApi';
import { useResetPasswordMutation } from 'modules/forgot-password/store/forgotPasswordApi';
import { PasswordObj } from 'modules/forgot-password/utils/types';
import { createPasswordValidationSchema } from 'modules/forgot-password/utils/validation';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { NewPasswordForm } from 'modules/forgot-password/components/common/NewPassword/NewPasswordForm';

const initialValues: PasswordObj = {
  password: '',
  confirmPassword: '',
};

export const NewPasswordScreen: FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const toast = useToast();
  const [resetPassword, { isSuccess }] = useResetPasswordMutation();
  const [fetchMe] = useLazyFetchMeQuery();

  useEffect(() => {
    if (isSuccess) {
      (async () => {
        await AsyncStorage.removeItem(AsyncStorageKeys.verificationToken);

        toast.show({
          placement: 'bottom',
          title: (
            <Text color="white" fontWeight="bold">
              {t('forgotPassword:newPasswordScreen:successMessage')}
            </Text>
          ),
          style: {
            backgroundColor: 'green',
          },
        });

        fetchMe();

        navigate(Screens.SIGN_IN_SCREEN);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleSubmit = async (
    values: PasswordObj,
    { setSubmitting }: FormikHelpers<PasswordObj>,
  ): Promise<void> => {
    const token = await AsyncStorage.getItem(
      AsyncStorageKeys.verificationToken,
    );

    const userId = await AsyncStorage.getItem(AsyncStorageKeys.userId);

    await resetPassword({
      ...values,
      userId: Number(userId),
      resetToken: String(token),
    });

    setSubmitting(false);
  };

  return (
    <ForgotPasswordWrapper title={t('forgotPassword:newPasswordScreen:title')}>
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
