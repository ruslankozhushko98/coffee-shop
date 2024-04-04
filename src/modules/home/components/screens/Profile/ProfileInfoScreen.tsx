import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { EditProfileValues } from 'modules/home/utils/types';
import { editProfileValidationSchema } from 'modules/home/utils/validation';
import { GENDER } from 'modules/auth/utils/constants';
import { useUserSelector } from 'modules/auth/store/authSelectors';
import { useLazyFetchMeQuery } from 'modules/auth/store/authApi';
import { useEditProfileMutation } from 'modules/home/store/profileApi';
import { ProfileInfoForm } from 'modules/home/components/common/Profile/ProfileInfo/ProfileInfoForm';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';

export const ProfileInfoScreen: FC = () => {
  const { t } = useTranslation();
  const user = useUserSelector();
  const [editProfile] = useEditProfileMutation();
  const [trigger] = useLazyFetchMeQuery();

  const handleSubmit = async (
    values: EditProfileValues,
    { setSubmitting }: FormikHelpers<EditProfileValues>,
  ): Promise<void> => {
    await editProfile({
      id: Number(user?.id),
      ...values,
    });

    trigger();

    setSubmitting(false);
  };

  return (
    <HomeLayout>
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
    </HomeLayout>
  );
};
