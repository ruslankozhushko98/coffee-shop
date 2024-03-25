import React, { FC, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'native-base';
import { useDebounce } from '@uidotdev/usehooks';

import { useFetchBeverages } from 'hooks/home/useFetchBeverages';
import { DEBOUNCE_DELAY } from 'libs/utils/constants';
import { Loading } from 'libs/components/layout/Loading';
import { BeverageOpts } from 'modules/home/utils/types';
import { SearchBar } from 'modules/home/components/common/SearchBar';
import { BeverageRow } from 'modules/home/components/common/Home/BeverageRow';
import { BeverageDetailsModal } from 'modules/home/components/common/Home/BeverageDetailsModal';

export const HomeScreen: FC = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [selectBeverageId, setSelectBeverageId] = useState<number | null>(null);
  const debounceTitle = useDebounce<string>(title, DEBOUNCE_DELAY);
  const { isLoading, data } = useFetchBeverages(debounceTitle);

  const renderItem: ListRenderItem<BeverageOpts> = ({ item, index }) => {
    const handleSelectItem = (): void => setSelectBeverageId(item.id);

    return (
      <BeverageRow key={index} {...item} onSelectItem={handleSelectItem} />
    );
  };

  return (
    <View>
      <Text fontWeight="bold" fontSize="xl" my={2} mx={3.5}>
        {t('home:menu')}
      </Text>

      <SearchBar value={title} onChangeText={setTitle} mx={3.5} />

      <BeverageDetailsModal
        beverageId={selectBeverageId}
        setBeverageId={setSelectBeverageId}
      />

      <FlatList
        px={3.5}
        pt={6}
        h="full"
        data={data}
        ListEmptyComponent={
          isLoading ? (
            <Loading backgroundColor="transparent" />
          ) : (
            <Text fontWeight="bold" fontSize="xl" color="tertiary.600">
              {t('home:noBeverageMessage')}
            </Text>
          )
        }
        refreshing={isLoading}
        renderItem={renderItem}
      />
    </View>
  );
};
