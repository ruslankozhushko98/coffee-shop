import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'native-base';
import { useFormikContext } from 'formik';

import { TextField } from 'libs/components/layout/formik/fields';

export const NewPasswordForm: FC = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext();

  return (
    <View>
      <TextField
        name="password"
        label={t('fields:newPassword:label')}
        placeholder={t('fields:newPassword:placeholder')}
        variant="underlined"
        formControlProps={{ mb: 5 }}
      />

      <TextField
        name="confirmPassword"
        label={t('fields:confirmPassword:label')}
        placeholder={t('fields:confirmPassword:placeholder')}
        variant="underlined"
        formControlProps={{ mb: 5 }}
      />

      <Button variant="solid" rounded="2xl" onPress={handleSubmit}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          {t('forgotPassword:newPasswordScreen:form:newPasswordBtn')}
        </Text>
      </Button>
    </View>
  );
};
