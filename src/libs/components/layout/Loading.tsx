import React, { FC } from 'react';
import { ActivityIndicator } from 'react-native';
import { View } from 'native-base';
import { IViewProps } from 'native-base/lib/typescript/components/basic/View/types';

type Props = {
  backgroundColor?: string;
} & IViewProps;

export const Loading: FC<Props> = ({
  backgroundColor = 'rgba(0, 0, 0, 0.3)',
  ...props
}) => (
  <View
    flex={1}
    alignItems="center"
    justifyContent="center"
    position="absolute"
    zIndex={9}
    backgroundColor={backgroundColor}
    w="full"
    h="full"
    {...props}
  >
    <ActivityIndicator color="#059669" size="large" />
  </View>
);
