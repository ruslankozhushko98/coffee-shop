import React, { FC } from 'react';
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
  const { mutate } = useRequestAccountVerification();

  const handleSubmit = (values: EnterEmailInitialValues): void => {
    mutate(values.email);
  };

  return (
    <ForgotPasswordWrapper title="Enter your email so we could send a verification code!">
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
