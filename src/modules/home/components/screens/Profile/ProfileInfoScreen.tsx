import React, { FC } from 'react';
import { Keyboard } from 'react-native';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View } from 'native-base';
import { Formik, FormikHelpers } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { GENDER } from 'modules/auth/utils/constants';
import { useUserSelector } from 'modules/auth/store/authSelectors';
import { useLazyFetchMeQuery } from 'modules/auth/store/authApi';
import { EditProfileValues } from 'modules/home/utils/types';
import { editProfileValidationSchema } from 'modules/home/utils/validation';
import { useEditProfileMutation } from 'modules/home/store/profileApi';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';
import { ProfileInfoForm } from 'modules/home/components/common/Profile/ProfileInfo/ProfileInfoForm';

export const ProfileInfoScreen: FC = () => {
  const { t } = useTranslation();
  const isKeyboardOpened = useKeyboardOpened();
  const user = useUserSelector();
  const [editProfile] = useEditProfileMutation();
  const [fetchMe] = useLazyFetchMeQuery();

  const handleSubmit = async (
    values: EditProfileValues,
    { setSubmitting }: FormikHelpers<EditProfileValues>,
  ): Promise<void> => {
    if (isKeyboardOpened) {
      Keyboard.dismiss();
    }

    await editProfile({
      id: Number(user?.id),
      ...values,
    });

    fetchMe();

    setSubmitting(false);
  };

  return (
    <HomeLayout>
      <KeyboardAwareScrollView>
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
      </KeyboardAwareScrollView>
    </HomeLayout>
  );
};
