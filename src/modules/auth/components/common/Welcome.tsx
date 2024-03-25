import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Box, Text } from 'native-base';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import CoffeeIcon from 'libs/assets/icons/coffee.svg';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'libs/utils/constants';

const styles = StyleSheet.create({
  coffeeIcon: {
    alignSelf: 'center',
  },
});

export const Welcome: FC = () => {
  const { t } = useTranslation();
  const isKeyboardOpened = useKeyboardOpened();

  return (
    <Box>
      <CoffeeIcon
        style={styles.coffeeIcon}
        width={SCREEN_WIDTH * 0.5}
        height={SCREEN_HEIGHT * 0.2}
      />

      {!isKeyboardOpened && (
        <Text textAlign="center" fontWeight="bold" fontSize="2xl">
          {t('auth:welcome')}
        </Text>
      )}
    </Box>
  );
};
