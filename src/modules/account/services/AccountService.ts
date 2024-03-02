import { AxiosResponse } from 'axios';

import { httpClient } from 'libs/utils/config';
import { AccountVerificationDto } from 'modules/account/utils/types';

type MsgOpts = {
  message: string;
};

class AccountService {
  private static _instance: AccountService;

  constructor() {
    if (AccountService._instance) {
      throw new Error('Account service instance does already exist!');
    }
  }

  public static getInstance(): AccountService {
    if (!AccountService._instance) {
      AccountService._instance = new AccountService();
    }

    return AccountService._instance;
  }

  public requestOTC(userId: number): Promise<AxiosResponse<MsgOpts>> {
    return httpClient.post('/account/create-otc', { userId });
  }

  public activateAccount(
    dto: AccountVerificationDto,
  ): Promise<AxiosResponse<MsgOpts>> {
    return httpClient.post('/account/activate', dto);
  }
}

export const accountService = AccountService.getInstance();
