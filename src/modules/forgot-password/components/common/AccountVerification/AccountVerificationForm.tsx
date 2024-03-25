import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'native-base';
import { useFormikContext } from 'formik';

import { TextField } from 'libs/components/layout/formik/fields';

export const AccountVerificationForm: FC = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext();

  return (
    <View>
      <TextField
        name="code"
        label={t('fields:code:label')}
        placeholder={t('fields:code:placeholder')}
        variant="underlined"
        keyboardType="number-pad"
        formControlProps={{ mb: 5 }}
      />

      <Button variant="solid" rounded="2xl" onPress={handleSubmit}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          {t('links:send')}
        </Text>
      </Button>
    </View>
  );
};
