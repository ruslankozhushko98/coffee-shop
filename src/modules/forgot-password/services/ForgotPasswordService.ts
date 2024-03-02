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
}

export const forgotPasswordService = ForgotPasswordService.getInstance();
