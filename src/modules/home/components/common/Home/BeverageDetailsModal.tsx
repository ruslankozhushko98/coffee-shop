import React, { FC } from 'react';
import { Modal, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Box, Button, Text, View } from 'native-base';

import { useGlobalContext } from 'contexts/globalContext';
import { useFetchBeverageById } from 'hooks/home/useFetchBeverageById';
import { useToggleBeverageFavorite } from 'hooks/home/useToggleBeverageFavorite';
import CoffeeIcon from 'libs/assets/icons/coffee.svg';
import { normalize } from 'libs/utils/helpers';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from 'libs/utils/constants';
import { Loading } from 'libs/components/layout/Loading';

import { styles } from './styles';

type Props = {
  beverageId: number | null;
  setBeverageId: (beverageId: number | null) => void;
};

export const BeverageDetailsModal: FC<Props> = ({
  beverageId,
  setBeverageId,
}) => {
  const { t } = useTranslation();
  const { user } = useGlobalContext();
  const { isLoading, data, refetch, isRefetching } =
    useFetchBeverageById(beverageId);
  const { mutateAsync, isPending } = useToggleBeverageFavorite();

  const handleClose = (): void => setBeverageId(null);

  const toggleFavorite = async (): Promise<void> => {
    if (user?.id) {
      await mutateAsync({
        beverageId: Number(data?.id),
        userId: Number(user?.id),
      });

      refetch();
    }
  };

  return (
    <Modal
      visible={Boolean(beverageId)}
      onDismiss={handleClose}
      animationType="slide"
    >
      {(isPending || isRefetching) && (
        <Loading backgroundColor="rgba(0, 0, 0, 0.6)" h="full" />
      )}

      <SafeAreaView style={styles.flexContainer}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth="2"
          borderBottomColor="tertiary.600"
        >
          <Text ml={5} fontSize="2xl" fontWeight="bold" color="tertiary.600">
            {data?.title || t('home:beverageDetails:title')}
          </Text>

          <Button variant="link" onPress={handleClose}>
            <Icon name="close" color="#059669" size={normalize(25)} />
          </Button>
        </Box>

        {isLoading ? (
          <Loading backgroundColor="white" />
        ) : (
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
                  {data?.isFavorite ? (
                    <Icon name="star" color="orange" size={normalize(30)} />
                  ) : (
                    <Icon name="star-outline" size={normalize(30)} />
                  )}
                </TouchableOpacity>
              </View>

              <Text fontSize="xl" fontWeight="bold">
                {data?.description || '-'}
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};
