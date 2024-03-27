import { Alert, PixelRatio, Platform } from 'react-native';
import { t } from 'i18next';

import { SCREEN_WIDTH } from './constants';

const scale = SCREEN_WIDTH / 320;

export function normalize(size: number): number {
  const newSize = size * scale;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

export function debounce(func: Function, timeout = 300) {
  let timer: NodeJS.Timeout;

  return (...args: any) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

export function formatPrice(price: number): string {
  return `$${Number(price).toFixed(2)}`;
}

export function showAvailableSoonAlert() {
  Alert.alert('', t('alerts:availableSoon:title'), [
    {
      text: t('links:okay'),
      style: 'cancel',
    },
  ]);
}
