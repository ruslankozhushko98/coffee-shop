import React, { FC } from 'react';
import { ListRenderItem, RefreshControl, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'native-base';

import { useFetchFavoriteBeverages } from 'hooks/home/useFetchFavoriteBeverages';
import { useGlobalContext } from 'contexts/globalContext';
import { Loading } from 'libs/components/layout/Loading';
import { BeverageOpts } from 'modules/home/utils/types';
import { BeverageRow } from './BeverageRow';
import { useNavigation } from '@react-navigation/native';
import { Screens } from 'libs/utils/constants';

type Props = {
  setSelectBeverageId: (beverageId: number | null) => void;
};

export const FavoriteBeveragesList: FC<Props> = ({ setSelectBeverageId }) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();
  const { data, isLoading, refetch, isRefetching } =
    useFetchFavoriteBeverages();
  const { user } = useGlobalContext();

  if (!user) {
    const handleGoToSignIn = (): void => navigate(Screens.SIGN_IN_SCREEN);

    return (
      <View px={3.5} pt={6} flexDirection="row">
        <TouchableOpacity onPress={handleGoToSignIn}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.600"
            textDecorationLine="underline"
          >
            {t('links:signIn')}
          </Text>
        </TouchableOpacity>

        <Text fontWeight="bold" fontSize="xl" ml={2}>
          {t('home:beveragesTabs:favorites:unauthMessage')}
        </Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<BeverageOpts> = ({ item, index }) => {
    const handleSelectItem = (): void => setSelectBeverageId(item.id);

    return (
      <BeverageRow key={index} {...item} onSelectItem={handleSelectItem} />
    );
  };

  return (
    <FlatList
      px={3.5}
      pt={6}
      h="full"
      data={data}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
      ListEmptyComponent={
        isLoading ? (
          <Loading backgroundColor="transparent" />
        ) : (
          <Text fontWeight="bold" fontSize="xl" color="tertiary.600">
            {t('home:noFavoriteBeverageMessage')}
          </Text>
        )
      }
      refreshing={isLoading}
      renderItem={renderItem}
    />
  );
};
