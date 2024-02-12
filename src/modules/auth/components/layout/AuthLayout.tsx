import React, { FC, PropsWithChildren } from 'react';
import { Platform } from 'react-native';
import { Box, KeyboardAvoidingView } from 'native-base';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { Welcome } from 'modules/auth/components/common/Welcome';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  const isKeyboardOpened = useKeyboardOpened();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      justifyContent={isKeyboardOpened ? 'unset' : 'center'}
      flex={1}
    >
      <Box px={6} pt={4}>
        <Welcome />

        {children}
      </Box>
    </KeyboardAvoidingView>
  );
};
