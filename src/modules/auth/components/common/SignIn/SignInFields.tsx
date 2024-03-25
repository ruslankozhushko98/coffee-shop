import React, { FC, useEffect } from 'react';
import { BiometryTypes } from 'react-native-biometrics';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Box, Button, Text } from 'native-base';
import { useFormikContext } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { useBiometrics } from 'hooks/useBiometrics';
import FaceID from 'libs/assets/icons/face-id.svg';
import TouchID from 'libs/assets/icons/touch-id.svg';
import { Screens } from 'libs/utils/constants';
import { TextField } from 'libs/components/layout/formik/fields';
import { SignInDto } from 'modules/auth/utils/types';
import { AuthLayout } from 'modules/auth/components/layout/AuthLayout';

import { styles } from './styles';

export const SignInFields: FC = () => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const isKeyboardOpened = useKeyboardOpened();
  const { handleSubmit, isSubmitting } = useFormikContext<SignInDto>();
  const { verifyBiometrics, isBiometricSetup, biometricType } = useBiometrics();

  useEffect(() => {
    if (isBiometricSetup) {
      verifyBiometrics();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBiometricSetup]);

  const goToForgotPassword = (): void =>
    navigate(Screens.FORGOT_PASSWORD_STACK);

  return (
    <AuthLayout>
      <Box>
        <TextField
          name="email"
          label={t('fields:email:label')}
          variant="underlined"
          placeholder={t('fields:email:placeholder')}
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="password"
          label={t('fields:password:label')}
          labelProps={{ pt: isKeyboardOpened ? 1 : 3 }}
          variant="underlined"
          placeholder={t('fields:password:placeholder')}
          type="password"
          errorVisible={!isKeyboardOpened}
        />

        <Button
          variant="link"
          mt={!isKeyboardOpened ? 2 : null}
          alignSelf="flex-end"
          onPress={goToForgotPassword}
        >
          <Text fontSize="sm" fontWeight="bold" color="tertiary.600" underline>
            {t('links:forgotPassword')}
          </Text>
        </Button>

        <Button
          mt={!isKeyboardOpened ? 2 : null}
          shadow={2}
          onPress={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          <Text fontSize="md" fontWeight="bold" color="blueGray.200">
            {t('links:signIn')}
          </Text>
        </Button>

        {!isKeyboardOpened && isBiometricSetup && (
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
                <TouchID style={styles.icon} width={50} height={50} />
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
