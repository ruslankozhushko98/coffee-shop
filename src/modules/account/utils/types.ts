export type VerificationCodeInitialValues = {
  code: string;
};

export type AccountVerificationDto = {
  code: string;
  userId: number;
};

export type VerifyDto = {
  userId: number;
  token: string;
};

export type VerificationResponse = {
  userId: number;
  token: string;
};
