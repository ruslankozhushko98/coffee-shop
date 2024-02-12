import { PixelRatio, Platform } from 'react-native';

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
