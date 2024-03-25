import * as Yup from 'yup';
import { t } from 'i18next';

import { GENDER } from './constants';

export const signInValidationSchema = Yup.object({
  email: Yup.string()
    .label(t('fields:email:label'))
    .email(t('fields:email:invalidMessage'))
    .required(t('fields:email:requiredMessage')),

  password: Yup.string()
    .label(t('fields:password:label'))
    .min(6, t('fields:password:minLengthMessage'))
    .required(t('fields:password:requiredMessage')),
});

export const signUpValidationSchema = Yup.object({
  email: Yup.string()
    .label(t('fields:email:label'))
    .email(t('fields:email:invalidMessage'))
    .required(t('fields:email:requiredMessage')),

  password: Yup.string()
    .label(t('fields:password:label'))
    .min(6, t('fields:password:minLengthMessage'))
    .required(t('fields:password:requiredMessage')),

  firstName: Yup.string()
    .label(t('fields:firstName:label'))
    .required(t('fields:firstName:requiredMessage')),

  lastName: Yup.string()
    .label(t('fields:lastName:label'))
    .required(t('fields:lastName:requiredMessage')),

  dob: Yup.string()
    .label(t('fields:dob:label'))
    .required(t('fields:dob:requiredMessage')),

  gender: Yup.string()
    .label(t('fields:gender:label'))
    .oneOf([GENDER.FEMALE, GENDER.MALE, GENDER.OTHER])
    .default(GENDER.OTHER),
});
