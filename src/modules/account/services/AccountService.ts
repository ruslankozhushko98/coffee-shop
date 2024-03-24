import { AxiosResponse } from 'axios';

import { httpClient } from 'libs/config/httpClient';
import {
  AccountVerificationDto,
  VerificationResponse,
} from 'modules/account/utils/types';
import { UserCheckObj } from 'modules/forgot-password/utils/types';

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
    return httpClient.post('/account/email/activate', dto);
  }

  public async requestAccountVerification(
    email: string,
  ): Promise<UserCheckObj> {
    const { data } = await httpClient.post('/account/check-user', { email });
    return data;
  }

  public async verifyAccount(
    dto: AccountVerificationDto,
  ): Promise<VerificationResponse> {
    const { data } = await httpClient.post('/account/email/verify', dto);
    return data;
  }
}

export const accountService = AccountService.getInstance();
