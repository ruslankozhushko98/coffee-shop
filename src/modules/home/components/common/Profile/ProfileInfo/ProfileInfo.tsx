import React, { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { useEditProfile } from 'hooks/home/profile/useEditProfile';
import { useGlobalContext } from 'contexts/globalContext';
import { Queries } from 'libs/utils/constants';
import { EditProfileValues } from 'modules/home/utils/types';
import { editProfileValidationSchema } from 'modules/home/utils/validation';
import { GENDER } from 'modules/auth/utils/constants';
import { ProfileInfoForm } from './ProfileInfoForm';

export const ProfileInfo: FC = () => {
  const { t } = useTranslation();
  const { user } = useGlobalContext();
  const queryClient = useQueryClient();
  const { mutateAsync } = useEditProfile();

  const handleSubmit = async (
    values: EditProfileValues,
    { setSubmitting }: FormikHelpers<EditProfileValues>,
  ): Promise<void> => {
    await mutateAsync({
      id: Number(user?.id),
      ...values,
    });

    await queryClient.invalidateQueries({
      queryKey: [Queries.FETCH_ME],
    });

    setSubmitting(false);
  };

  return (
    <View flex={1}>
      <View borderBottomWidth="2" mb="4">
        <Text fontWeight="bold" fontSize="2xl">
          {t('profile:title')}
        </Text>
      </View>

      <Formik
        initialValues={{
          firstName: user?.firstName || '',
          lastName: user?.lastName || '',
          email: user?.email || '',
          gender: user?.gender || GENDER.OTHER,
        }}
        validationSchema={editProfileValidationSchema}
        onSubmit={handleSubmit}
      >
        <ProfileInfoForm />
      </Formik>
    </View>
  );
};
