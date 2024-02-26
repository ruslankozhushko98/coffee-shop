import { AxiosResponse } from 'axios';

import { httpClient } from 'libs/utils/config';
import {
  AuthBiometricDto,
  PublicKeyDto,
  SignInDto,
  SignUpDto,
} from 'modules/auth/utils/types';
import { User } from 'modules/auth/models';

type AuthObj = {
  accessToken: string;
  user: User;
};

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

  public async signIn(dto: SignInDto): Promise<AuthObj> {
    const { data } = await httpClient.post('/auth/sign-in', dto);
    return data;
  }

  public async signUp(dto: SignUpDto): Promise<AuthObj> {
    const { data } = await httpClient.post('/auth/sign-up', dto);
    return data;
  }

  public async fetchMe(): Promise<User> {
    const { data } = await httpClient.get('/auth/me');
    return data;
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
