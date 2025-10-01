import { API_ENDPOINT } from '@/configs/api';
import { TUpdateProfile } from '@/types/profile';
import axiosInstance from '@/utils/axios';

export const getProfile = async () => {
  const res = await axiosInstance.get(`${API_ENDPOINT.PROFILE.INDEX}`);

  return res.data;
};

export const updateProfile = async (data: TUpdateProfile) => {
  const res = await axiosInstance.patch(`${API_ENDPOINT.PROFILE.INDEX}`, data);

  return res.data;
};
