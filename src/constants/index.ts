export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'ORTHER',
}

export const VerificationCodeTypeType = {
  REGISTER: 'REGISTER',
  FORGOT_PASSWORD: 'FORGOT_PASSWORD',
  LOGIN: 'LOGIN',
  DISABLE_2FA: 'DISABLE_2FA',
} as const;

export type VerificationCodeType = keyof typeof VerificationCodeTypeType;
