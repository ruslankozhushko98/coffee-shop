import * as Yup from 'yup';

import { PHONE_REGEX } from 'libs/utils/constants';

export const loginValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters!')
    .required('Password is required!'),
});

export const registerValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters!')
    .required('Password is required!'),
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
  phoneNumber: Yup.string()
    .matches(PHONE_REGEX)
    .required('Phone number is required!'),
});
