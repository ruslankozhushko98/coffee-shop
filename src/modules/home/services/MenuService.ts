import { httpClient } from 'libs/utils/config';
import { Beverage } from 'modules/home/models';
import {
  BeverageOpts,
  ToggleBeverageFavoriteDto,
} from 'modules/home/utils/types';

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

  public async fetchBeverages(title?: string): Promise<Array<BeverageOpts>> {
    const { data } = await httpClient.get('/menu/all', { params: { title } });
    return data;
  }

  public async fetchBeverageById(beverageId: number): Promise<Beverage> {
    const { data } = await httpClient.get(`/menu/${beverageId}`);
    return data;
  }

  public async toggleBeverageFavorite(
    dto: ToggleBeverageFavoriteDto,
  ): Promise<ToggleBeverageFavoriteDto> {
    const { data } = await httpClient.put('/menu/toggle-favorite', dto);
    return data;
  }
}

export const menuService = MenuService.getInstance();
