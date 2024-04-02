import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'native-base';

import { useGlobalContext } from 'contexts/globalContext';
import { SignInToSee } from 'modules/home/components/common/SignInToSee';
import { OrdersList } from 'modules/home/components/common/Orders/OrdersList';

export const OrdersScreen: FC = () => {
  const { t } = useTranslation();
  const { user } = useGlobalContext();

  return (
    <View flex={1}>
      <View backgroundColor="white">
        <Text fontWeight="bold" fontSize="xl" my={2} mx={3.5}>
          {t('orders:title')}
        </Text>
      </View>

      {user ? <OrdersList /> : <SignInToSee ml={3.5} mt={3} />}
    </View>
  );
};
