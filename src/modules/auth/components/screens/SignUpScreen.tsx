import React, { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';

import { useSignUp } from 'hooks/auth/useSignUp';
import { registerValidationSchema } from 'modules/auth/utils/validation';
import { SignUpDto } from 'modules/auth/utils/types';
import { GENDER } from 'modules/auth/utils/constants';
import { SignUpFields } from 'modules/auth/components/common/SignUp/SignUpFields';

const initialValues: SignUpDto = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  gender: GENDER.OTHER,
};

export const SignUpScreen: FC = () => {
  const { mutate } = useSignUp();

  const handleSubmit = (
    values: SignUpDto,
    { setSubmitting }: FormikHelpers<SignUpDto>,
  ): void => {
    mutate(values);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
    >
      <SignUpFields />
    </Formik>
  );
};
