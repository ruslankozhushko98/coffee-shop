import React, { FC } from 'react';
import { Alert, Modal, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { Screens } from 'libs/utils/constants';
import { showAvailableSoonAlert } from 'libs/utils/helpers';
import { Loading } from 'libs/components/layout/Loading';
import { useUserSelector } from 'modules/auth/store/authSelectors';
import {
  useFetchBeverageByIdQuery,
  useToggleBeverageFavoriteMutation,
} from 'modules/home/store/menuApi';
import { BeverageDetailsModalHeader } from './BeverageDetailsModalHeader';
import { BeverageDetailsModalBody } from './BeverageDetailsModalBody';

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
  const { navigate } = useNavigation();
  const user = useUserSelector();
  const { data, isLoading, refetch, isFetching } = useFetchBeverageByIdQuery(
    Number(beverageId),
    {
      skip: !beverageId,
    },
  );
  const [toggleBeverageFavorite, { isLoading: isPending }] =
    useToggleBeverageFavoriteMutation();

  const handleClose = (): void => setBeverageId(null);

  const showSignInAlert = (): void => {
    Alert.alert('', t('alerts:signIn:title'), [
      {
        text: t('links:signIn'),
        onPress() {
          setBeverageId(null);
          navigate(Screens.SIGN_IN_SCREEN);
        },
      },
      {
        text: t('links:cancel'),
        style: 'cancel',
      },
    ]);
  };

  const toggleFavorite = async (): Promise<void> => {
    if (user?.id) {
      await toggleBeverageFavorite({
        beverageId: Number(data?.id),
        userId: Number(user?.id),
      });

      await refetch();
    } else {
      showSignInAlert();
    }
  };

  const handleAddToOrder = (): void => {
    if (user?.id) {
      showAvailableSoonAlert();
    } else {
      showSignInAlert();
    }
  };

  return (
    <Modal
      visible={Boolean(beverageId)}
      onDismiss={handleClose}
      animationType="slide"
    >
      {(isPending || isFetching) && (
        <Loading backgroundColor="rgba(0, 0, 0, 0.6)" h="full" />
      )}

      <SafeAreaView style={styles.flexContainer}>
        <BeverageDetailsModalHeader
          title={data?.title || t('home:beverageDetails:title')}
          onClose={handleClose}
        />

        {isLoading ? (
          <Loading backgroundColor="white" />
        ) : (
          <BeverageDetailsModalBody
            description={data?.description || '-'}
            isFavorite={Boolean(data?.isFavorite)}
            toggleFavorite={toggleFavorite}
            addToOrder={handleAddToOrder}
          />
        )}
      </SafeAreaView>
    </Modal>
  );
};
