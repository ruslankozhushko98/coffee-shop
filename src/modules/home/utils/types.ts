import { NavigationState, SceneRendererProps } from 'react-native-tab-view';

import { GENDER } from 'modules/auth/utils/constants';
import { Beverage } from 'modules/home/models';
import { BEVERAGES_LIST_TABS } from './constants';

export type BeverageOpts = Pick<Beverage, 'id' | 'title' | 'price'>;

export type FavoriteBeverageOpts = Pick<
  Beverage,
  'id' | 'title' | 'price' | 'isFavorite'
>;

export type ToggleBeverageFavoriteDto = {
  beverageId: number;
  userId: number;
};

export type EditProfileDto = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: GENDER;
};

export type EditProfileValues = Omit<EditProfileDto, 'id'>;

export type RouteOptions = {
  key: BEVERAGES_LIST_TABS;
  title: string;
};

export type TabBarProps = SceneRendererProps & {
  navigationState: NavigationState<RouteOptions>;
};

export type RenderSceneProps = SceneRendererProps & {
  route: RouteOptions;
};
