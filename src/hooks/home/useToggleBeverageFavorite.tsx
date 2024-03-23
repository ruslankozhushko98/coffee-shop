import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Text, useToast } from 'native-base';

import { Mutations } from 'libs/utils/constants';
import { menuService } from 'modules/home/services';

export const useToggleBeverageFavorite = () => {
  const toast = useToast();

  return useMutation({
    mutationKey: [Mutations.TOGGLE_BEVERAGE_FAVORITE],
    mutationFn: menuService.toggleBeverageFavorite,
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
