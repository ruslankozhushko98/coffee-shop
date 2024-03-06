import { httpClient } from 'libs/utils/config';
import { User } from 'modules/auth/models';
import { ResetPasswordDto } from 'modules/forgot-password/utils/types';

class ForgotPasswordService {
  private static _instance: ForgotPasswordService;

  constructor() {
    if (ForgotPasswordService._instance) {
      throw new Error('ForgotPasswordService instance does already exist!');
    }
  }

  public static getInstance(): ForgotPasswordService {
    if (!ForgotPasswordService._instance) {
      ForgotPasswordService._instance = new ForgotPasswordService();
    }

    return ForgotPasswordService._instance;
  }

  public async resetPassword(dto: ResetPasswordDto): Promise<User> {
    const { data } = await httpClient.put('/account/reset-password', dto);
    return data;
  }
}

export const forgotPasswordService = ForgotPasswordService.getInstance();
