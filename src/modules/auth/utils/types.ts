import { User } from 'modules/auth/models';

export type SignInDto = Pick<User, 'email' | 'password'>;
export type SignUpDto = Omit<User, 'id'>;
