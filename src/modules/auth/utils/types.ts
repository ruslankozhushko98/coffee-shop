import { User } from 'modules/auth/models';

export type SignInDto = Pick<User, 'email' | 'password'>;
export type SignUpDto = Omit<User, 'id' | 'isActivated'>;

export type PublicKeyDto = {
  userId: number;
  key: string;
};

export type AuthBiometricDto = {
  signature: string;
  payload: string;
};

export type AuthObj = {
  accessToken: string;
  user: User;
};
