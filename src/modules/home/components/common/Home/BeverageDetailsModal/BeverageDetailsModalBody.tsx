import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Text, View } from 'native-base';

import CoffeeIcon from 'libs/assets/icons/coffee.svg';
import { normalize } from 'libs/utils/helpers';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'libs/utils/constants';

import { styles } from './styles';

type Props = {
  description: string;
  isFavorite: boolean;
  toggleFavorite: () => void;
  addToOrder: () => void;
};

export const BeverageDetailsModalBody: FC<Props> = ({
  description,
  isFavorite,
  toggleFavorite,
  addToOrder,
}) => {
  const { t } = useTranslation();

  return (
    <View px={5}>
      <CoffeeIcon
        style={styles.coffeeIcon}
        width={SCREEN_WIDTH * 0.7}
        height={SCREEN_HEIGHT * 0.3}
      />

      <View>
        <View
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="tertiary.600"
            textDecorationLine="underline"
          >
            {t('home:beverageDetails:description')}
          </Text>

          <TouchableOpacity onPress={toggleFavorite}>
            {isFavorite ? (
              <Icon name="star" color="orange" size={normalize(30)} />
            ) : (
              <Icon name="star-outline" size={normalize(30)} />
            )}
          </TouchableOpacity>
        </View>

        <Text fontSize="xl" fontWeight="bold">
          {description}
        </Text>
      </View>

      <Button
        variant="solid"
        rounded="full"
        w="full"
        onPress={addToOrder}
        alignSelf="flex-end"
        mt="10"
      >
        <Text color="white" fontWeight="bold" fontSize="xl">
          {t('home:beverageDetails:addToOrderBtn')}
        </Text>
      </Button>
    </View>
  );
};
