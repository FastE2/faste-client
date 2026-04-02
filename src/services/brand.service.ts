import { API_ENDPOINT } from '@/configs/api';
import axios from 'axios';

export const getAllBrands = async (
  params: { page?: number; limit?: number } = { page: 1, limit: 10 },
) => {
  try {
    const res = await axios.get(`${API_ENDPOINT.MANAGE_PRODUCT.BRAND.INDEX}`, {
      params,
    });

    return res.data;
  } catch (error) {
    return error;
  }
};
