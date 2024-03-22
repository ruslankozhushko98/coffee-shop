import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IInputProps, Input } from 'native-base';

import { normalize } from 'libs/utils/helpers';

const styles = StyleSheet.create({
  icon: {
    marginLeft: normalize(10),
  },
});

export const SearchBar: FC<IInputProps> = ({
  value,
  onChangeText,
  ...props
}) => (
  <Input
    leftElement={
      <Icon
        name="search"
        size={normalize(12)}
        color="grey"
        style={styles.icon}
      />
    }
    {...props}
    autoFocus={false}
    value={value}
    onChangeText={onChangeText}
    variant="outline"
    placeholder="Search"
    backgroundColor="white"
    fontSize="md"
  />
);
