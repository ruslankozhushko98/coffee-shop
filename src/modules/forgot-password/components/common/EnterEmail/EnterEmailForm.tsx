import React, { FC } from 'react';
import { Button, Text, View } from 'native-base';
import { useFormikContext } from 'formik';

import { TextField } from 'libs/components/layout/formik/fields';
import { EnterEmailInitialValues } from 'modules/forgot-password/utils/types';

export const EnterEmailForm: FC = () => {
  const { handleSubmit } = useFormikContext<EnterEmailInitialValues>();

  return (
    <View>
      <TextField
        name="email"
        label="Email"
        placeholder="Enter your email"
        variant="underlined"
        formControlProps={{ mb: 5 }}
      />

      <Button variant="solid" rounded="2xl" onPress={handleSubmit}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          Send
        </Text>
      </Button>
    </View>
  );
};
