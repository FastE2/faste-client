import { API_ENDPOINT } from '@/configs/api';
import { AddToCartRequest, UpdateCartQuantityRequest } from '@/types/cart';
import axiosInstance from '@/utils/axios';

/**
 * GET /cart
 * get all item cart by user
 */
export const getCartByMe = async (
  params: { page?: number; limit?: number } = { page: 1, limit: 10 },
  signal?: AbortSignal,
) => {
  try {
    const res = await axiosInstance.get(`${API_ENDPOINT.CART.INDEX}`, {
      params,
      signal,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

/**
 * POST /cart
 * Add item to cart
 */
export const addToCart = async (data: AddToCartRequest) => {
  try {
    const res = await axiosInstance.post(`${API_ENDPOINT.CART.INDEX}`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateCartQuantity = async (
  data: UpdateCartQuantityRequest,
  signal?: AbortSignal,
) => {
  const { id, ...rest } = data;
  try {
    const res = await axiosInstance.put(
      `${API_ENDPOINT.CART.INDEX}/${id}`,
      rest,
      { signal },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCartItem = async (id: number, signal?: AbortSignal) => {
  try {
    const res = await axiosInstance.delete(`${API_ENDPOINT.CART.INDEX}/${id}`, {
      signal,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};
