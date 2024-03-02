import React, { FC } from 'react';
import { Button, Text, View } from 'native-base';
import { useFormikContext } from 'formik';

import { TextField } from 'libs/components/layout/formik/fields';

export const NewPasswordForm: FC = () => {
  const { handleSubmit } = useFormikContext();

  return (
    <View>
      <TextField
        name="password"
        label="Password"
        placeholder="Enter new password"
        variant="underlined"
        formControlProps={{ mb: 5 }}
      />

      <TextField
        name="confirm-password"
        label="Confirm password"
        placeholder="Confirm password"
        variant="underlined"
        formControlProps={{ mb: 5 }}
      />

      <Button variant="solid" rounded="2xl" onPress={handleSubmit}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          Create new password
        </Text>
      </Button>
    </View>
  );
};
