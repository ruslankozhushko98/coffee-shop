import React, { FC } from 'react';
import { ListRenderItem, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FlatList, Text } from 'native-base';

import { useFetchFavoriteBeverages } from 'hooks/home/useFetchFavoriteBeverages';
import { useGlobalContext } from 'contexts/globalContext';
import { Loading } from 'libs/components/layout/Loading';
import { BeverageOpts } from 'modules/home/utils/types';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';
import { SignInToSee } from 'modules/home/components/common/Profile/SignInToSee';
import { BeverageRow } from './BeverageRow';

type Props = {
  setSelectBeverageId: (beverageId: number | null) => void;
};

export const FavoriteBeveragesList: FC<Props> = ({ setSelectBeverageId }) => {
  const { t } = useTranslation();
  const { data, isLoading, refetch, isRefetching } =
    useFetchFavoriteBeverages();
  const { user } = useGlobalContext();

  if (!user) {
    return (
      <HomeLayout>
        <SignInToSee
          message={t('home:beveragesTabs:favorites:unauthMessage')}
        />
      </HomeLayout>
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
