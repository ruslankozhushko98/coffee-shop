import { AxiosResponse } from 'axios';

import { httpClient } from 'libs/utils/config';
import { SignInDto, SignUpDto } from 'modules/auth/utils/types';
import { User } from 'modules/auth/models';

type AccessTokenObj = {
  accessToken: string;
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

  public signIn(data: SignInDto): Promise<AxiosResponse<AccessTokenObj>> {
    return httpClient.post('/auth/sign-in', data);
  }

  public signUp(data: SignUpDto): Promise<AxiosResponse<AccessTokenObj>> {
    return httpClient.post('/auth/sign-up', data);
  }

  public async fetchMe(): Promise<User> {
    const { data } = await httpClient.get('/auth/me');
    return data;
  }
}

export const authService = AuthService.getInstance();
