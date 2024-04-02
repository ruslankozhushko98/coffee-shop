import React, { FC } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Box, Button, Text } from 'native-base';

import { normalize } from 'libs/utils/helpers';

type Props = {
  title: string;
  onClose: () => void;
};

export const BeverageDetailsModalHeader: FC<Props> = ({ title, onClose }) => (
  <Box
    flexDirection="row"
    alignItems="center"
    justifyContent="space-between"
    borderBottomWidth="2"
    borderBottomColor="tertiary.600"
  >
    <Text ml={5} fontSize="2xl" fontWeight="bold" color="tertiary.600">
      {title}
    </Text>

    <Button variant="link" onPress={onClose}>
      <Icon name="close" color="#059669" size={normalize(25)} />
    </Button>
  </Box>
);
