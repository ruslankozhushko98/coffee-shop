import React from 'react';
import { Text, useToast } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';

import { useGlobalContext } from 'contexts/globalContext';
import { Mutations, Screens } from 'libs/utils/constants';
import { accountService } from 'modules/account/services';

export const useActivateAccount = () => {
  const { navigate } = useNavigation();
  const toast = useToast();
  const { user, setUser } = useGlobalContext();

  return useMutation({
    mutationKey: [Mutations.ACTIVATE_ACCOUNT],
    mutationFn: accountService.activateAccount,
    onSuccess() {
      if (user) {
        setUser({
          ...user,
          isActivated: true,
        });
      }

      navigate(Screens.HOME_SCREEN);
    },
    onError(error) {
      toast.show({
        placement: 'bottom',
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
