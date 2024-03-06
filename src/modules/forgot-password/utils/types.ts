export type EmailObj = {
  email: string;
};

export type PasswordObj = {
  password: string;
  confirmPassword: string;
};

export type EnterEmailInitialValues = {
  email: string;
};

export type UserCheckObj = {
  message: string;
  userId: number;
};

export type ResetPasswordDto = {
  userId: number;
  password: string;
  confirmPassword: string;
  resetToken: string;
};
