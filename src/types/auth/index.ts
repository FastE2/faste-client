import { VerificationCodeType } from '../../constants/index';

export type TLoginAuth = {
  email: string;
  password: string;
  totpCode?: string;
};

export type TRegisterAuth = {
  email: string;
  name: string;
  code: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
};

export type TSendOtp = {
  email: string;
  type: VerificationCodeType;
};

export type TForgotPasswordAuth = {
  email: string;
  password: string;
  confirmPassword: string;
  code: string;
};

export type TTwoFADisable = {
  totpCode: string;
};

export type TTwoFAEnableRes = {
  uri: string;
};

export type TDevice = {
  id: number;
  userId: number;
  userAgent: string;
  ip: string;
  lastActive: string;
  createdAt: string;
  isActive: boolean;
};

export type UserDataType = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  avatar: string;
  isTwoFactorEnabled: boolean;
  addresses: any[];
  role: {
    name: string;
  };
} | null;
