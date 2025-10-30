export type TLoginAuth = {
  email: string;
  password: string;
  deviceToken?: string;
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
} | null;
