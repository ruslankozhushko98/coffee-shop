import React, { FC, useState } from 'react';
import { ListRenderItem, TouchableOpacity } from 'react-native';
import { FlatList, Text, View } from 'native-base';
import { useDebounce } from '@uidotdev/usehooks';

import { useFetchBeverages } from 'hooks/home/useFetchBeverages';
import { DEBOUNCE_DELAY } from 'libs/utils/constants';
import { formatPrice } from 'libs/utils/helpers';
import { Loading } from 'libs/components/layout/Loading';
import { Beverage } from 'modules/home/models';
import { SearchBar } from 'modules/home/components/common/SearchBar';

import { styles } from './styles';

export const HomeScreen: FC = () => {
  const [title, setTitle] = useState<string>('');
  const debounceTitle = useDebounce<string>(title, DEBOUNCE_DELAY);
  const { isLoading, data } = useFetchBeverages(debounceTitle);

  const renderItem: ListRenderItem<Beverage> = ({ item, index }) => (
    <TouchableOpacity key={index} style={styles.rowItem}>
      <Text fontSize="md" fontWeight="medium" color="tertiary.600">
        {item.title}
      </Text>

      <Text fontSize="md" fontWeight="medium" color="tertiary.600">
        {formatPrice(item.price)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Text fontWeight="bold" fontSize="xl" my={2} mx={3.5}>
        Menu
      </Text>

      <SearchBar value={title} onChangeText={setTitle} mx={3.5} />

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
              No beverages found!
            </Text>
          )
        }
        refreshing={isLoading}
        renderItem={renderItem}
      />
    </View>
  );
};
