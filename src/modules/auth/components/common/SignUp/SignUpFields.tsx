import React, { FC } from 'react';
import { Text, View } from 'native-base';
import { useFormikContext } from 'formik';

import { SignUpDto } from 'modules/auth/utils/types';

export const SignUpFields: FC = () => {
  const { handleSubmit, handleChange, handleBlur, values } =
    useFormikContext<SignUpDto>();

  return (
    <View>
      <Text>SignUpFields</Text>
    </View>
  );
};
