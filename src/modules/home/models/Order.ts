import { ORDER_STATUS } from 'libs/utils/constants';
import { Beverage } from './Beverage';

export interface Order {
  id: number;
  price: number;
  userId: number;
  status: ORDER_STATUS;
  beverages: Array<Beverage>;
  createdAt: string;
  updatedAt: string;
}
