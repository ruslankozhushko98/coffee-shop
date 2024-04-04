import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Select, Text, View } from 'native-base';
import { useFormikContext } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { SelectField, TextField } from 'libs/components/layout/formik/fields';
import { useUserSelector } from 'modules/auth/store/authSelectors';
import { GENDER } from 'modules/auth/utils/constants';
import { EditProfileValues } from 'modules/home/utils/types';

export const ProfileInfoForm: FC = () => {
  const { t } = useTranslation();
  const isKeyboardOpened = useKeyboardOpened();
  const user = useUserSelector();
  const { handleSubmit, isSubmitting, values } =
    useFormikContext<EditProfileValues>();
  const [isEditBtnVisible, setIsEditBtnVisible] = useState<boolean>(false);

  useEffect(() => {
    const isNotEqual =
      values.email !== user?.email ||
      values.firstName !== user?.firstName ||
      values.lastName !== user?.lastName ||
      values.gender !== user?.gender;

    setIsEditBtnVisible(isNotEqual);
  }, [user, values]);

  return (
    <View>
      <TextField
        variant="underlined"
        name="firstName"
        label={t('fields:firstName:label')}
        placeholder={t('fields:firstName:placeholder')}
        mb={2}
      />

      <TextField
        variant="underlined"
        name="lastName"
        label={t('fields:lastName:label')}
        placeholder={t('fields:lastName:placeholder')}
        mb={2}
      />

      <TextField
        variant="underlined"
        name="email"
        label={t('fields:email:label')}
        placeholder={t('fields:email:placeholder')}
        mb={2}
      />

      <SelectField
        name="gender"
        label={t('fields:gender:label')}
        labelProps={{ pt: 3 }}
        variant="underlined"
        placeholder={t('fields:gender:placeholder')}
        errorVisible={!isKeyboardOpened}
        mb={2}
      >
        <Select.Item label={t('genders:male')} value={GENDER.MALE} />
        <Select.Item label={t('genders:female')} value={GENDER.FEMALE} />
        <Select.Item label={t('genders:other')} value={GENDER.OTHER} />
      </SelectField>

      <View flexDirection="row" alignItems="center" mb={7}>
        <Text fontWeight="bold" fontSize="lg">
          {t('fields:dob:label')}:
        </Text>

        <Text fontSize="lg" ml={2}>
          {user?.dob}
        </Text>
      </View>

      {isEditBtnVisible && (
        <Button variant="solid" isLoading={isSubmitting} onPress={handleSubmit}>
          <Text fontWeight="medium" fontSize="xl" color="white">
            {t('links:edit')}
          </Text>
        </Button>
      )}
    </View>
  );
};
