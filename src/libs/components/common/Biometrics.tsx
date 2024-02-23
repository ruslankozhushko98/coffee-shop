import React, { FC } from 'react';
import { Alert } from 'react-native';
import RNBiometrics, { BiometryTypes } from 'react-native-biometrics';
import { Button, Text } from 'native-base';

import { useGlobalContext } from 'contexts/globalContext';

export const Biometrics: FC = () => {
  const { user } = useGlobalContext();

  return (
    <Button>
      <Text>Biometrics</Text>
    </Button>
  );
};
