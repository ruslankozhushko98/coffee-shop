import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';

import { formatPrice } from 'libs/utils/helpers';
import { BeverageOpts } from 'modules/home/utils/types';

import { styles } from './styles';

type Props = {
  onSelectItem: () => void;
} & BeverageOpts;

export const BeverageRow: FC<Props> = ({ title, price, onSelectItem }) => (
  <TouchableOpacity style={styles.rowItem} onPress={onSelectItem}>
    <Text fontSize="md" fontWeight="medium" color="tertiary.600">
      {title}
    </Text>

    <Text fontSize="md" fontWeight="medium" color="tertiary.600">
      {formatPrice(price)}
    </Text>
  </TouchableOpacity>
);
