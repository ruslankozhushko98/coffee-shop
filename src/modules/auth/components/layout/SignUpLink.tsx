import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from 'native-base';

import { Screens } from 'libs/utils/constants';
import { normalize } from 'libs/utils/helpers';

const styles = StyleSheet.create({
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: normalize(10),
  },
});

export const SignUpLink: FC = () => {
  const { navigate } = useNavigation();

  const goToSignUp = (): void => navigate(Screens.SIGN_UP_SCREEN);

  return (
    <TouchableOpacity style={styles.link} onPress={goToSignUp}>
      <Text mr={1.5} fontSize="lg" fontWeight="medium" color="tertiary.600">
        Sign up
      </Text>

      <Icon name="angle-right" color="#059669" size={normalize(24)} />
    </TouchableOpacity>
  );
};
