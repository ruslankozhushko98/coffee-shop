import React, { FC } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Box, Button, Input, Text, KeyboardAvoidingView } from 'native-base';
import { useFormikContext } from 'formik';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import CoffeeIcon from 'libs/assets/icons/coffee.svg';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'libs/utils/constants';
import { LoginInitialValues } from 'modules/auth/utils/types';

const styles = StyleSheet.create({
  coffeeIcon: {
    alignSelf: 'center',
  },
});

export const LoginFields: FC = () => {
  const { handleSubmit, handleChange, handleBlur, isSubmitting, values } =
    useFormikContext<LoginInitialValues>();
  const isVisible = useKeyboardOpened();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      justifyContent={isVisible ? 'unset' : 'center'}
      flex={1}
    >
      <Box px={6} pt={4}>
        <Box>
          <CoffeeIcon
            style={styles.coffeeIcon}
            width={SCREEN_WIDTH * 0.5}
            height={SCREEN_HEIGHT * 0.2}
          />

          {!isVisible && (
            <Text textAlign="center" fontWeight="bold" fontSize="2xl">
              Welcome!
            </Text>
          )}
        </Box>

        <Box>
          <Input
            variant="underlined"
            type="text"
            placeholder="Email"
            size="md"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
          />

          <Input
            pt={8}
            variant="underlined"
            type="password"
            placeholder="Password"
            size="md"
            value={values.password}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
          />

          <Button
            mt={8}
            shadow={2}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text fontSize="md" fontWeight="bold" color="blueGray.200">
              Sign in
            </Text>
          </Button>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};
