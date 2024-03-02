import * as Yup from 'yup';

import { PASSWORD_REGEX } from 'libs/utils/constants';

export const enterEmailValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid!').required('Email is invalid!'),
});

export const verificationCodeValidationSchema = Yup.object({
  code: Yup.string().required('Code is invalid!'),
});

export const createPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .label('Password')
    .matches(PASSWORD_REGEX, {
      message: `
        Password must contain:
        1. Upper-case letters;
        2. Lower-case letters;
        3. Special characters;
        4. Numbers;
        5. Length must be at least 8 characters;
      `,
    })
    .required('Password is invalid!'),

  confirmPassword: Yup.string()
    .label('Confirm password')
    .oneOf([Yup.ref('password')], 'Password does not match!')
    .required('You must confirm your password'),
});
