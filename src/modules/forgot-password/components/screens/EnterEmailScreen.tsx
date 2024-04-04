import React, { FC, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { Text, useToast } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { useRequestAccountVerificationMutation } from 'modules/account/store/accountApi';
import { enterEmailValidationSchema } from 'modules/forgot-password/utils/validation';
import { EnterEmailInitialValues } from 'modules/forgot-password/utils/types';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { EnterEmailForm } from 'modules/forgot-password/components/common/EnterEmail/EnterEmailForm';

const initialValues = {
  email: 'gajshenec@gmail.com',
};

export const EnterEmailScreen: FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const { navigate } = useNavigation();
  const [requestAccountVerification, { isSuccess, data }] =
    useRequestAccountVerificationMutation();

  useEffect(() => {
    if (isSuccess && data) {
      (async () => {
        await AsyncStorage.setItem(
          AsyncStorageKeys.userId,
          String(data?.userId),
        );

        toast.show({
          placement: 'bottom',
          title: (
            <Text color="white" fontWeight="bold">
              {data?.message}
            </Text>
          ),
          style: {
            backgroundColor: 'green',
          },
        });

        navigate(Screens.FORGOT_PASSWORD_ACCOUNT_VERIFICATION_SCREEN);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.message, data?.userId, isSuccess]);

  const handleSubmit = async (
    values: EnterEmailInitialValues,
    { setSubmitting }: FormikHelpers<EnterEmailInitialValues>,
  ): Promise<void> => {
    await requestAccountVerification(values.email);
    setSubmitting(false);
  };

  return (
    <ForgotPasswordWrapper title={t('forgotPassword:enterEmailScreen:title')}>
      <Formik
        initialValues={initialValues}
        validationSchema={enterEmailValidationSchema}
        onSubmit={handleSubmit}
      >
        <EnterEmailForm />
      </Formik>
    </ForgotPasswordWrapper>
  );
};
