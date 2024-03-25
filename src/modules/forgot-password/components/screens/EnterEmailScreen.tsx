import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import { useRequestAccountVerification } from 'hooks/account/useRequestAccountVerification';
import { enterEmailValidationSchema } from 'modules/forgot-password/utils/validation';
import { EnterEmailInitialValues } from 'modules/forgot-password/utils/types';
import { ForgotPasswordWrapper } from 'modules/forgot-password/components/layout/ForgotPasswordWrapper';
import { EnterEmailForm } from 'modules/forgot-password/components/common/EnterEmail/EnterEmailForm';

const initialValues = {
  email: 'gajshenec@gmail.com',
};

export const EnterEmailScreen: FC = () => {
  const { t } = useTranslation();
  const { mutate } = useRequestAccountVerification();

  const handleSubmit = (values: EnterEmailInitialValues): void => {
    mutate(values.email);
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
