import React, { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { Select, Text, View } from 'native-base';

import { useKeyboardOpened } from 'hooks/useKeyboardOpened';
import { useGlobalContext } from 'contexts/globalContext';
import { normalize } from 'libs/utils/helpers';
import { AsyncStorageKeys, Screens } from 'libs/utils/constants';
import { languages } from 'libs/localization/i18n';
import { FormControlWrapper } from 'libs/components/layout/FormControlWrapper';
import { HomeLayout } from 'modules/home/components/layout/HomeLayout';
import { SignInToSee } from 'modules/home/components/common/Profile/SignInToSee';
import { ProfileBottomButtons } from 'modules/home/components/common/Profile/ProfileBottomButtons';

import { styles } from './styles';

export const ProfileScreen: FC = () => {
  const { t, i18n } = useTranslation();
  const isKeyboardOpened = useKeyboardOpened();
  const { navigate } = useNavigation();
  const { user, setIsLanguageChanging } = useGlobalContext();

  const handleGoToProfileInfo = (): void =>
    navigate(Screens.PROFILE_INFO_SCREEN);

  const handleChangeLanguage = async (lang: string): Promise<void> => {
    setIsLanguageChanging(true);

    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem(AsyncStorageKeys.lang, lang);

    setIsLanguageChanging(false);
  };

  return (
    <HomeLayout>
      <FormControlWrapper label="Language">
        <Select
          variant="underlined"
          defaultValue={i18n.language}
          onValueChange={handleChangeLanguage}
        >
          {languages.map((item, index) => (
            <Select.Item key={index} label={item.toUpperCase()} value={item} />
          ))}
        </Select>
      </FormControlWrapper>

      {user ? (
        <View flex={1} justifyContent="space-between" pb="12" pt="5">
          <TouchableOpacity style={styles.link} onPress={handleGoToProfileInfo}>
            <Text fontWeight="bold" fontSize="xl">
              {t('profileInfo:title')}
            </Text>

            <Icon name="chevron-right" size={normalize(25)} />
          </TouchableOpacity>

          {!isKeyboardOpened && <ProfileBottomButtons />}
        </View>
      ) : (
        <SignInToSee />
      )}
    </HomeLayout>
  );
};
