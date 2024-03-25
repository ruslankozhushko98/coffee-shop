import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'native-base';
import { useFormikContext } from 'formik';

import { TextField } from 'libs/components/layout/formik/fields';
import { EnterEmailInitialValues } from 'modules/forgot-password/utils/types';

export const EnterEmailForm: FC = () => {
  const { t } = useTranslation();
  const { handleSubmit } = useFormikContext<EnterEmailInitialValues>();

  return (
    <View>
      <TextField
        name="email"
        label={t('fields:email:label')}
        placeholder={t('fields:email:placeholder')}
        variant="underlined"
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
