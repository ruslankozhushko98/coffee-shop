import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Text, useToast } from 'native-base';

import { Mutations } from 'libs/utils/constants';
import { ordersService } from 'modules/home/services';

export const useCreateOrder = () => {
  const { t } = useTranslation();
  const toast = useToast();

  return useMutation({
    mutationKey: [Mutations.CREATE_ORDER],
    mutationFn: ordersService.createOrder,
    onSuccess() {
      toast.show({
        placement: 'top',
        title: (
          <Text color="white" fontWeight="bold">
            {t('orders:createdMessage')}
          </Text>
        ),
        style: {
          backgroundColor: 'green',
        },
      });
    },
    onError(error) {
      toast.show({
        placement: 'top',
        title: (
          <Text color="white" fontWeight="bold">
            {error.message}
          </Text>
        ),
        style: {
          backgroundColor: 'red',
        },
      });
    },
  });
};
