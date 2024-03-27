import * as Yup from 'yup';
import { t } from 'i18next';

import { GENDER } from 'modules/auth/utils/constants';

export const editProfileValidationSchema = Yup.object({
  email: Yup.string()
    .label(t('fields:email:label'))
    .email(t('fields:email:invalidMessage'))
    .required(t('fields:email:requiredMessage')),

  firstName: Yup.string()
    .label(t('fields:firstName:label'))
    .required(t('fields:firstName:requiredMessage')),

  lastName: Yup.string()
    .label(t('fields:lastName:label'))
    .required(t('fields:lastName:requiredMessage')),

  gender: Yup.string()
    .label(t('fields:gender:label'))
    .oneOf([GENDER.FEMALE, GENDER.MALE, GENDER.OTHER])
    .default(GENDER.OTHER),
});
