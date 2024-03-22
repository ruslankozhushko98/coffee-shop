import { httpClient } from 'libs/utils/config';
import { Beverage } from 'modules/home/models';

class MenuService {
  private static _instance: MenuService;

  constructor() {
    if (MenuService._instance) {
      throw new Error('MenuService instance does already exist!');
    }
  }

  public static getInstance(): MenuService {
    if (!MenuService._instance) {
      MenuService._instance = new MenuService();
    }

    return MenuService._instance;
  }

  public async fetchBeverages(title?: string): Promise<Array<Beverage>> {
    const { data } = await httpClient.get('/menu/all', { params: { title } });
    return data;
  }
}

export const menuService = MenuService.getInstance();
