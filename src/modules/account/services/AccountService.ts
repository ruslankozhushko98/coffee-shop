import { AxiosResponse } from 'axios';

import { httpClient } from 'libs/utils/config';
import { AccountVerificationDto } from 'modules/account/utils/types';

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

  public requestOTC(
    userId: number,
  ): Promise<AxiosResponse<{ message: string }>> {
    return httpClient.post('/account/create-otc', { userId });
  }

  public verifyAccount(
    dto: AccountVerificationDto,
  ): Promise<AxiosResponse<{ message: string }>> {
    return httpClient.post('/account/email/verify', dto);
  }
}

export const accountService = AccountService.getInstance();
