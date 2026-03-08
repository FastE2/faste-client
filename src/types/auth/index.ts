import { VerificationCodeType } from '../../constants/index';

export type TLoginAuth = {
  email: string;
  password: string;
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

export type UserDataType = {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  avatar: string;
  addresses: any[];
  role: {
    name: string;
  };
} | null;
