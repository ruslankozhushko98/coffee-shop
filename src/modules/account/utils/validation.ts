import * as Yup from 'yup';
import { t } from 'i18next';

export const accountVerificationSchema = Yup.object({
  code: Yup.string()
    .label(t('fields:code:label'))
    .required(t('fields:code:requiredMessage')),
});
