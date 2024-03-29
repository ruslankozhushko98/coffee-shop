import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@tanstack/react-query';
import { Text, useToast } from 'native-base';

import { Mutations } from 'libs/utils/constants';
import { profileService } from 'modules/home/services';

export const useEditProfile = () => {
  const toast = useToast();
  const { t } = useTranslation();

  return useMutation({
    mutationKey: [Mutations.EDIT_PROFILE],
    mutationFn: profileService.editProfile,
    onSuccess() {
      toast.show({
        placement: 'top',
        title: (
          <Text color="white" fontWeight="bold">
            {t('profile:profileEditedMessage')}
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
            {error?.message}
          </Text>
        ),
        style: {
          backgroundColor: 'red',
        },
      });
    },
  });
};
