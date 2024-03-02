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
    marginLeft: normalize(10),
  },
});

export const SignInLink: FC = () => {
  const { navigate } = useNavigation();

  const goToSignUp = (): void => navigate(Screens.SIGN_IN_SCREEN);

  return (
    <TouchableOpacity style={styles.link} onPress={goToSignUp}>
      <Icon name="angle-left" color="#059669" size={normalize(24)} />

      <Text ml={1.5} fontSize="lg" fontWeight="medium" color="tertiary.600">
        Sign in
      </Text>
    </TouchableOpacity>
  );
};
