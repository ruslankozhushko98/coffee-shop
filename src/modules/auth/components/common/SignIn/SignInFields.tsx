import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Text } from 'native-base';
import { useFormikContext } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { Screens } from 'libs/utils/constants';
import { TextField } from 'libs/components/layout/formik/fields';
import { SignInDto } from 'modules/auth/utils/types';
import { AuthLayout } from 'modules/auth/components/layout/AuthLayout';

export const SignInFields: FC = () => {
  const { navigate } = useNavigation();
  const isKeyboardOpened = useKeyboardOpened();
  const { handleSubmit, isSubmitting } = useFormikContext<SignInDto>();

  const goToSignUpScreen = (): void => {
    navigate(Screens.SIGN_UP_SCREEN);
  };

  return (
    <AuthLayout>
      <Box>
        <TextField
          name="email"
          label="Email"
          inputProps={{
            variant: 'underlined',
            placeholder: 'Enter your email',
          }}
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="password"
          label="Password"
          inputProps={{
            variant: 'underlined',
            placeholder: 'Enter your password',
            type: 'password',
          }}
          labelProps={{ pt: 3 }}
          errorVisible={!isKeyboardOpened}
        />

        <Button
          mt={8}
          shadow={2}
          onPress={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          <Text fontSize="md" fontWeight="bold" color="blueGray.200">
            Sign in
          </Text>
        </Button>

        {!isKeyboardOpened && (
          <>
            <Text textAlign="center" fontSize="md" mt={4}>
              Or
            </Text>

            <Button onPress={goToSignUpScreen} mt={1} variant="link">
              <Text fontSize="md" fontWeight="bold">
                Create account
              </Text>
            </Button>
          </>
        )}
      </Box>
    </AuthLayout>
  );
};
