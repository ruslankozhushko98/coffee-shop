import React, { FC, PropsWithChildren } from 'react';
import { Box } from 'native-base';

import { Welcome } from 'modules/auth/components/common/Welcome';

export const AuthLayout: FC<PropsWithChildren> = ({ children }) => (
  <Box px={6} pt={4}>
    <Welcome />

    {children}
  </Box>
);
