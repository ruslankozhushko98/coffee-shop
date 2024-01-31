import React, { FC } from 'react';
import { Formik } from 'formik';

import { loginValidationSchema } from 'modules/auth/utils/validation';
import { LoginFields } from 'modules/auth/components/common/Login/LoginFields';

export const LoginScreen: FC = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={console.log}
    >
      <LoginFields />
    </Formik>
  );
};
