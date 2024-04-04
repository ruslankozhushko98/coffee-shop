import { AxiosResponse } from 'axios';

import { httpClient } from 'libs/config/httpClient';
import {
  AuthBiometricDto,
  AuthObj,
  PublicKeyDto,
} from 'modules/auth/utils/types';

class AuthService {
  private static _instance: AuthService;

  constructor() {
    if (AuthService._instance) {
      throw new Error('AuthService instance does already exist!');
    }
  }

  public static getInstance(): AuthService {
    if (!AuthService._instance) {
      AuthService._instance = new AuthService();
    }

    return AuthService._instance;
  }

  public async createPublicKey(
    dto: PublicKeyDto,
  ): Promise<AxiosResponse<{ message: string }>> {
    return httpClient.post('/auth/create-public-key', dto);
  }

  public async authBiometric(dto: AuthBiometricDto): Promise<AuthObj> {
    const { data } = await httpClient.post('/auth/auth-biometric', dto);
    return data;
  }
}

export const authService = AuthService.getInstance();
