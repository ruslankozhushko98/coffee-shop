import { GENDER } from 'modules/auth/utils/constants';
import { Beverage } from 'modules/home/models';

export type BeverageOpts = Pick<Beverage, 'id' | 'title' | 'price'>;

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
