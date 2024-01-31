import React, { FC } from 'react';
import { StackHeaderProps } from '@react-navigation/stack';
import { Box, Text } from 'native-base';

export const Header: FC<StackHeaderProps> = () => {
  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      px="2"
      py="2"
      bgColor="blueGray.400"
    >
      <Text>Coffee</Text>
    </Box>
  );
};
