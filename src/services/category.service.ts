import { API_ENDPOINT } from '@/configs/api';
import axios from 'axios';

export const getAllCategories = async (
  params: { page?: number; limit?: number } = { page: 1, limit: 10 },
  signal?: AbortSignal,
) => {
  try {
    const res = await axios.get(
      `${API_ENDPOINT.MANAGE_PRODUCT.CATEGORY.INDEX}`,
      {
        params,
        signal,
      },
    );

    return res.data;
  } catch (error) {
    return error;
  }
};
