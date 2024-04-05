/* eslint-disable indent */
import React, { FC, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { TabView, TabBar } from 'react-native-tab-view';
import { Text, View } from 'native-base';

import { Loading } from 'libs/components/layout/Loading';
import { BEVERAGES_LIST_TABS } from 'modules/home/utils/constants';
import { RenderSceneProps, TabBarProps } from 'modules/home/utils/types';
import { AllBeveragesList } from 'modules/home/components/common/Home/AllBeveragesList';
import { FavoriteBeveragesList } from 'modules/home/components/common/Home/FavoriteBeveragesList';
import { BeverageDetailsModal } from 'modules/home/components/common/Home/BeverageDetailsModal/BeverageDetailsModal';

import { styles } from './styles';

export const HomeScreen: FC = () => {
  const { t } = useTranslation();
  const layout = useWindowDimensions();
  const [selectBeverageId, setSelectBeverageId] = useState<number | null>(null);
  const [index, setIndex] = useState<number>(0);

  const renderScene = ({ route }: RenderSceneProps) => {
    switch (route.key) {
      case BEVERAGES_LIST_TABS.ALL:
        return <AllBeveragesList setSelectBeverageId={setSelectBeverageId} />;
      case BEVERAGES_LIST_TABS.FAVORITES:
        return (
          <FavoriteBeveragesList setSelectBeverageId={setSelectBeverageId} />
        );
      default:
        return null;
    }
  };

  const renderLazyPlaceholder = (): JSX.Element => (
    <Loading backgroundColor="transparent" />
  );

  const renderTabBar = (props: TabBarProps) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabBarIndicatorStyle}
      inactiveColor="#000"
      tabStyle={styles.tabBarStyle}
      labelStyle={styles.tabBarLabelStyle}
    />
  );

  return (
    <View flex={1}>
      <View backgroundColor="white">
        <Text fontWeight="bold" fontSize="xl" my={2} mx={3.5}>
          {t('home:menu')}
        </Text>
      </View>

      <TabView
        lazy
        navigationState={{
          index,
          routes: [
            {
              key: BEVERAGES_LIST_TABS.ALL,
              title: t('home:beveragesTabs:all:title'),
            },
            {
              key: BEVERAGES_LIST_TABS.FAVORITES,
              title: t('home:beveragesTabs:favorites:title'),
            },
          ],
        }}
        renderLazyPlaceholder={renderLazyPlaceholder}
        onIndexChange={setIndex}
        renderScene={renderScene}
        initialLayout={{ width: layout.width, height: layout.height }}
        renderTabBar={renderTabBar}
      />

      <BeverageDetailsModal
        beverageId={selectBeverageId}
        setBeverageId={setSelectBeverageId}
      />
    </View>
  );
};
