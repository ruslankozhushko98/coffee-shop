import { useSelector } from 'react-redux';

import { AppState } from 'libs/config/store';

export const useUserSelector = () =>
  useSelector((appState: AppState) => appState.authSlice.user);
