import React, { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { useSignIn } from 'hooks/auth/useSignIn';
import { loginValidationSchema } from 'modules/auth/utils/validation';
import { SignInDto } from 'modules/auth/utils/types';
import { SignInFields } from 'modules/auth/components/common/SignIn/SignInFields';

const initialValues: SignInDto = {
  email: '',
  password: '',
};

export const SignInScreen: FC = () => {
  const { mutate } = useSignIn();

  const handleSubmit = (
    values: SignInDto,
    { setSubmitting }: FormikHelpers<SignInDto>,
  ): void => {
    mutate(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
    >
      <SignInFields />
    </Formik>
  );
};
