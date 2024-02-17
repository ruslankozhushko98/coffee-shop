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

  public async signIn(dto: SignInDto): Promise<AccessTokenObj> {
    const { data } = await httpClient.post('/auth/sign-in', dto);
    return data;
  }

  public async signUp(dto: SignUpDto): Promise<AccessTokenObj> {
    const { data } = await httpClient.post('/auth/sign-up', dto);
    return data;
  }

  public async fetchMe(): Promise<User> {
    const { data } = await httpClient.get('/auth/me');
    return data;
  }
}

export const authService = AuthService.getInstance();
