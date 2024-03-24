import * as Yup from 'yup';

import { GENDER } from './constants';

export const signInValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters!')
    .required('Password is required!'),
});

export const signUpValidationSchema = Yup.object({
  email: Yup.string().email('Email is invalid').required('Email is required!'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters!')
    .required('Password is required!'),
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
  dob: Yup.string().required('Date of birth is required!'),
  gender: Yup.string()
    .label('Gender')
    .oneOf([GENDER.FEMALE, GENDER.MALE, GENDER.OTHER])
    .default(GENDER.OTHER),
});
