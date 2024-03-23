import { Beverage } from 'modules/home/models';

export type BeverageOpts = Pick<Beverage, 'id' | 'title' | 'price'>;

export type ToggleBeverageFavoriteDto = {
  beverageId: number;
  userId: number;
};
