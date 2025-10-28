import { API_ENDPOINT } from '@/configs/api';
import axiosInstance from '@/utils/axios';

export const getCartByMe = async (
  params: { page?: number; limit?: number } = { page: 1, limit: 10 },
) => {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINT.CART.INDEX}`, {
      params,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
