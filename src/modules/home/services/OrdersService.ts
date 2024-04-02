import { httpClient } from 'libs/config/httpClient';
import { Order } from 'modules/home/models';
import { CreateOrderDto } from 'modules/home/utils/types';

class OrdersService {
  private static _instance: OrdersService;

  constructor() {
    if (OrdersService._instance) {
      throw new Error('OrdersService instance does already exist!');
    }
  }

  public static getInstance(): OrdersService {
    if (!OrdersService._instance) {
      OrdersService._instance = new OrdersService();
    }

    return OrdersService._instance;
  }

  public async fetchOrders(): Promise<Array<Order>> {
    const { data } = await httpClient.get('/orders');
    return data;
  }

  public async fetchOrderById(orderId: number): Promise<Order> {
    const { data } = await httpClient.get(`/orders/${orderId}`);
    return data;
  }

  public async createOrder(dto: CreateOrderDto): Promise<Order> {
    const { data } = await httpClient.post('/orders/create', dto);
    return data;
  }
}

export const ordersService = OrdersService.getInstance();
