import * as Yup from 'yup';

export const accountVerificationSchema = Yup.object({
  code: Yup.string().label('Code').required('Code is required!'),
});
