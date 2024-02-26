import { GENDER } from 'modules/auth/utils/constants';

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  gender: GENDER;
  isVerified: boolean;
}
