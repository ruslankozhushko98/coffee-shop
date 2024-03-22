import React, { FC, PropsWithChildren } from 'react';
import { View } from 'native-base';

export const HomeLayout: FC<PropsWithChildren> = ({ children }) => (
  <View flex={1} p={2}>
    {children}
  </View>
);
