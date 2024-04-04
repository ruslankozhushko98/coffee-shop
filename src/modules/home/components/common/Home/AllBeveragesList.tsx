import React, { FC, useState } from 'react';
import { ListRenderItem } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDebounce } from '@uidotdev/usehooks';
import { FlatList, Text } from 'native-base';

import { DEBOUNCE_DELAY } from 'libs/utils/constants';
import { Loading } from 'libs/components/layout/Loading';
import { BeverageOpts } from 'modules/home/utils/types';
import { SearchBar } from 'modules/home/components/common/SearchBar';
import { useFetchBeveragesQuery } from 'modules/home/store/menuApi';
import { BeverageRow } from './BeverageRow';

type Props = {
  setSelectBeverageId: (beverageId: number | null) => void;
};

export const AllBeveragesList: FC<Props> = ({ setSelectBeverageId }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const debounceTitle = useDebounce<string>(title, DEBOUNCE_DELAY);
  const { isLoading, data } = useFetchBeveragesQuery(debounceTitle);

  const renderItem: ListRenderItem<BeverageOpts> = ({ item, index }) => {
    const handleSelectItem = (): void => setSelectBeverageId(item.id);

    return (
      <BeverageRow key={index} {...item} onSelectItem={handleSelectItem} />
    );
  };

  return (
    <>
      <SearchBar value={title} onChangeText={setTitle} mx={3.5} mt={6} />

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
    </>
  );
};
