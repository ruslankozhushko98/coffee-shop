import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'native-base';

import { Screens } from 'libs/utils/constants';
import i18n from 'libs/localization/i18n';

type Props = {
  message?: string;
};

export const SignInToSee: FC<Props> = ({
  message = i18n.t('messages:functionality'),
}) => {
  const { t } = useTranslation();
  const { navigate } = useNavigation();

  const handleGoToSignIn = (): void => navigate(Screens.SIGN_IN_SCREEN);

  return (
    <View flexDirection="row">
      <Text fontWeight="bold" fontSize="xl" flex={1} flexWrap="wrap">
        <TouchableOpacity onPress={handleGoToSignIn}>
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.600"
            textDecorationLine="underline"
          >
            {t('links:signIn')}
          </Text>
        </TouchableOpacity>

        {message}
      </Text>
    </View>
  );
};
