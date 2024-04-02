import { BEVERAGE_TYPES, SIZES } from 'libs/utils/constants';
import { GENDER } from 'modules/auth/utils/constants';
import { Beverage } from 'modules/home/models';

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

type BeverageOnOrderDto = {
  beverageId: number;
  size: SIZES;
  type: BEVERAGE_TYPES;
  amount: number;
};

export type CreateOrderDto = {
  userId: number;
  price: number;
  beverages: Array<BeverageOnOrderDto>;
};
