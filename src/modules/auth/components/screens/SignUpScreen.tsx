import React, { FC } from 'react';
import { Formik, FormikHelpers } from 'formik';
import dayjs from 'dayjs';

import { useSignUp } from 'hooks/auth/useSignUp';
import { DATE_FORMAT } from 'libs/utils/constants';
import { signUpValidationSchema } from 'modules/auth/utils/validation';
import { SignUpDto } from 'modules/auth/utils/types';
import { GENDER } from 'modules/auth/utils/constants';
import { SignUpFields } from 'modules/auth/components/common/SignUp/SignUpFields';

const initialValues: SignUpDto = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: dayjs().toString(),
  gender: GENDER.OTHER,
};

export const SignUpScreen: FC = () => {
  const { mutate } = useSignUp();

  const handleSubmit = (
    values: SignUpDto,
    { setSubmitting }: FormikHelpers<SignUpDto>,
  ): void => {
    mutate({
      ...values,
      dob: dayjs(values.dob).format(DATE_FORMAT),
    });

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signUpValidationSchema}
      onSubmit={handleSubmit}
    >
      <SignUpFields />
    </Formik>
  );
};
