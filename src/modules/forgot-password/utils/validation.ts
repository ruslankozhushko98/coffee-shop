import * as Yup from 'yup';
import { t } from 'i18next';

import { PASSWORD_REGEX } from 'libs/utils/constants';

export const enterEmailValidationSchema = Yup.object({
  email: Yup.string()
    .label(t('fields:email:label'))
    .email(t('fields:email:invalidMessage'))
    .required(t('fields:email:requiredMessage')),
});

export const verificationCodeValidationSchema = Yup.object({
  code: Yup.string()
    .label(t('fields:code:label'))
    .required(t('fields:code:requiredMessage')),
});

export const createPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .label(t('fields:newPassword:label'))
    .matches(PASSWORD_REGEX, {
      message: t('fields:newPassword:invalidMessage'),
    })
    .required(t('fields:newPassword:requiredMessage')),

  confirmPassword: Yup.string()
    .label(t('fields:confirmPassword:label'))
    .oneOf(
      [Yup.ref('password')],
      t('fields:confirmPassword:doesntMatchMessage'),
    )
    .required(t('fields:confirmPassword:requiredMessage')),
});
