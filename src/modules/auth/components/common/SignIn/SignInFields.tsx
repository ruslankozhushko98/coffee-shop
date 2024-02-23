import React, { FC, useEffect } from 'react';
import { BiometryTypes } from 'react-native-biometrics';
import { Box, Button, Text } from 'native-base';
import { useFormikContext } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { useBiometrics } from 'hooks/useBiometrics';
import FaceID from 'libs/assets/icons/face-id.svg';
import TouchId from 'libs/assets/icons/touch-id.svg';
import { TextField } from 'libs/components/layout/formik/fields';
import { SignInDto } from 'modules/auth/utils/types';
import { AuthLayout } from 'modules/auth/components/layout/AuthLayout';

import { styles } from './styles';

export const SignInFields: FC = () => {
  const isKeyboardOpened = useKeyboardOpened();
  const { handleSubmit, isSubmitting } = useFormikContext<SignInDto>();
  const { verifyBiometrics, isBiometricSetup, biometricType } = useBiometrics();

  const isBiometricBtnVisible: boolean = !isKeyboardOpened && isBiometricSetup;

  useEffect(() => {
    if (isBiometricSetup) {
      verifyBiometrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBiometricSetup]);

  return (
    <AuthLayout>
      <Box>
        <TextField
          name="email"
          label="Email"
          variant="underlined"
          placeholder="Enter your email"
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="password"
          label="Password"
          labelProps={{ pt: 3 }}
          variant="underlined"
          placeholder="Enter your password"
          type="password"
          errorVisible={!isKeyboardOpened}
        />

        <Button
          mt={4}
          shadow={2}
          onPress={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          <Text fontSize="md" fontWeight="bold" color="blueGray.200">
            Sign in
          </Text>
        </Button>

        {isBiometricBtnVisible && (
          <>
            <Text textAlign="center" fontSize="lg" fontWeight="bold" mt={3}>
              Or
            </Text>

            <Button
              variant="ghost"
              width="4xs"
              alignSelf="center"
              borderColor="blue.400"
              borderWidth={1}
              borderStyle="dashed"
              borderRadius="lg"
              mt={2}
              onPress={verifyBiometrics}
            >
              {biometricType === BiometryTypes.FaceID ? (
                <FaceID style={styles.icon} width={50} height={50} />
              ) : (
                <TouchId style={styles.icon} width={50} height={50} />
              )}

              <Text mt={1} color="blue.500" fontWeight="medium" fontSize="md">
                Sign in with {biometricType}
              </Text>
            </Button>
          </>
        )}
      </Box>
    </AuthLayout>
  );
};
