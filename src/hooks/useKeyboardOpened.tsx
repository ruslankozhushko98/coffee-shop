import { useState } from 'react';
import { Keyboard, Platform } from 'react-native';

export const useKeyboardOpened = (): boolean => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  if (Platform.OS === 'ios') {
    Keyboard.addListener('keyboardWillShow', () => {
      setIsVisible(true);
    });

    Keyboard.addListener('keyboardWillHide', () => {
      setIsVisible(false);
    });
  } else {
    Keyboard.addListener('keyboardDidShow', () => {
      setIsVisible(true);
    });

    Keyboard.addListener('keyboardDidHide', () => {
      setIsVisible(false);
    });
  }

  return isVisible;
};
