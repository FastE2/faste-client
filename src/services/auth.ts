import { API_ENDPOINT } from '@/configs/api';
import { TLoginAuth, TRegisterAuth, TSendOtp } from '@/types/auth';
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
