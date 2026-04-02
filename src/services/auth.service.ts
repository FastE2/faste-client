import { API_ENDPOINT } from '@/configs/api';
import {
  TDevice,
  TForgotPasswordAuth,
  TLoginAuth,
  TRegisterAuth,
  TSendOtp,
  TTwoFADisable,
  TTwoFAEnableRes,
} from '@/types/auth';
import axiosInstance from '@/utils/axios';
import axios from 'axios';

export const loginAuth = async (data: TLoginAuth) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.LOGIN}`, data, {
    withCredentials: true,
  });

  return res.data;
};

export const registerAuth = async (data: TRegisterAuth) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.REGISTER}`, data);

  return res.data;
};

export const sendOTP = async (data: TSendOtp) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.OTP}`, data);

  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${API_ENDPOINT.AUTH.REFRESH_TOKEN}`,
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const logoutAuth = async () => {
  const res = await axiosInstance.post(
    `${API_ENDPOINT.AUTH.LOGOUT}`,
    {},
    {
      withCredentials: true,
    },
  );
  return res.data;
};

export const forgotPassword = async (data: TForgotPasswordAuth) => {
  const res = await axios.post(`${API_ENDPOINT.AUTH.FORGOT_PASSWORD}`, data);
  return res.data;
};

export const enableTwoFactorAuth = async () => {
  const res = await axiosInstance.post(
    `${API_ENDPOINT.AUTH.TWO_FA_ENABLE}`,
    {},
  );
  return res.data.data as TTwoFAEnableRes;
};

export const disableTwoFactorAuth = async (data: TTwoFADisable) => {
  const res = await axiosInstance.post(
    `${API_ENDPOINT.AUTH.TWO_FA_DISABLE}`,
    data,
  );
  return res.data;
};

export const getDevices = async () => {
  const res = await axiosInstance.get(`${API_ENDPOINT.AUTH.DEVICE_ME}`);
  return res.data as TDevice[];
};
