import React, { FC } from 'react';
import { Modal, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Box, Button, Text, View } from 'native-base';

import { useFetchBeverageById } from 'hooks/home/useFetchBeverageById';
import { normalize } from 'libs/utils/helpers';
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
  const { isLoading, data } = useFetchBeverageById(beverageId);

  const handleClose = (): void => setBeverageId(null);

  return (
    <Modal
      visible={Boolean(beverageId)}
      onDismiss={handleClose}
      animationType="slide"
    >
      <SafeAreaView style={styles.flexContainer}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          borderBottomWidth="2"
          borderBottomColor="tertiary.600"
        >
          <Text ml={5} fontSize="2xl" fontWeight="bold" color="tertiary.600">
            {data?.title || 'Coffee details'}
          </Text>

          <Button variant="link" onPress={handleClose}>
            <Icon name="close" color="#059669" size={normalize(25)} />
          </Button>
        </Box>

        {isLoading ? (
          <Loading backgroundColor="white" />
        ) : (
          <View px={5}>
            <Icon name="coffee" color="#059669" size={normalize(290)} />

            <View>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="tertiary.600"
                textDecorationLine="underline"
              >
                Description:
              </Text>

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
