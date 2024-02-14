import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Select, Text } from 'native-base';
import { useFormikContext } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { Screens } from 'libs/utils/constants';
import { SelectField, TextField } from 'libs/components/layout/formik/fields';
import { SignInDto } from 'modules/auth/utils/types';
import { AuthLayout } from 'modules/auth/components/layout/AuthLayout';
import { GENDER } from 'modules/auth/utils/constants';

export const SignUpFields: FC = () => {
  const { navigate } = useNavigation();
  const isKeyboardOpened = useKeyboardOpened();
  const { handleSubmit, isSubmitting } = useFormikContext<SignInDto>();

  const goToSignInScreen = (): void => navigate(Screens.SIGN_IN_SCREEN);

  return (
    <KeyboardAwareScrollView>
      <AuthLayout>
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

        <TextField
          name="firstName"
          label="First name"
          inputProps={{
            variant: 'underlined',
            placeholder: 'Enter your first name',
            type: 'text',
          }}
          labelProps={{ pt: 3 }}
          errorVisible={!isKeyboardOpened}
        />

        <TextField
          name="lastName"
          label="Last name"
          inputProps={{
            variant: 'underlined',
            placeholder: 'Enter your last name',
            type: 'text',
          }}
          labelProps={{ pt: 3 }}
          errorVisible={!isKeyboardOpened}
        />

        <SelectField
          name="gender"
          label="Gender"
          selectProps={{
            variant: 'underlined',
            placeholder: 'Choose your gender',
          }}
          labelProps={{ pt: 3 }}
          errorVisible={!isKeyboardOpened}
        >
          <Select.Item label={GENDER.MALE} value={GENDER.MALE} />
          <Select.Item label={GENDER.FEMALE} value={GENDER.FEMALE} />
          <Select.Item label={GENDER.OTHER} value={GENDER.OTHER} />
        </SelectField>

        <Button
          mt={4}
          shadow={2}
          onPress={handleSubmit}
          disabled={isSubmitting}
          isLoading={isSubmitting}
        >
          <Text fontSize="md" fontWeight="bold" color="blueGray.200">
            Sign up
          </Text>
        </Button>

        {!isKeyboardOpened && (
          <>
            <Text textAlign="center" fontSize="md" mt={4}>
              Or
            </Text>

            <Button onPress={goToSignInScreen} variant="link">
              <Text fontSize="md" fontWeight="bold">
                Sign in
              </Text>
            </Button>
          </>
        )}
      </AuthLayout>
    </KeyboardAwareScrollView>
  );
};
