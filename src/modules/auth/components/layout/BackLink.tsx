import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'native-base';
import { t } from 'i18next';

import { normalize } from 'libs/utils/helpers';

const styles = StyleSheet.create({
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: normalize(10),
  },
});

type Props = {
  title?: string;
};

export const BackLink: FC<Props> = ({ title = t('links:back') }) => {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity style={styles.link} onPress={goBack}>
      <Icon name="angle-left" color="#059669" size={normalize(24)} />

      <Text ml={1.5} fontSize="lg" fontWeight="medium" color="tertiary.600">
        {title}
      </Text>
    </TouchableOpacity>
  );
};
