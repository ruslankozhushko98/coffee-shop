import React, { FC, PropsWithChildren } from 'react';
import { Text, View } from 'native-base';

type Props = {
  title: string;
} & PropsWithChildren;

export const ForgotPasswordWrapper: FC<Props> = ({ title, children }) => {
  return (
    <View p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={5}>
        {title}
      </Text>

      {children}
    </View>
  );
};
