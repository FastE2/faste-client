import { API_ENDPOINT } from '@/configs/api';
import { ApiResponse } from '@/types/api-response';
import { CreateOrderType, OrderStatus } from '@/types/order';
import axiosInstance from '@/utils/axios';

export const createOrder = async (data: CreateOrderType) => {
  try {
    const res = await axiosInstance.post(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`,
      data,
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getAllOrdersByUser = async (
  params: { page?: number; limit?: number } = { page: 1, limit: 10 },
) => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}`,
      { params },
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getDetailOrderById = async (id: number) => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/${id}`,
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getDetailOrderTXById = async (id: number) => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/tx/${id}`,
    );

    return res.data;
  } catch (error) {
    return error;
  }
};

export const getOrdersByShop = async (
  params: { page?: number; limit?: number } = { page: 1, limit: 10 },
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/seller`,
      { params },
    );

    return {
      status: 'success',
      message: 'Fetch order by shop success.',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to fetch order by shop details. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const getDetailOrderByIdByShop = async (
  id: number,
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/shop/${id}`,
    );

    return {
      status: 'success',
      message: 'Fetch order by shop success.',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    console.log('error', error);
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to fetch order by shop details. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const updateOrderStatus = async (
  id: number,
  data: {
    status?: OrderStatus | undefined;
    addressShipId?: number | undefined;
  },
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.patch(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/status/${id}`,
      data,
    );

    return {
      status: 'success',
      message: 'Update status order success.',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    console.log('error', error);
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to Update order. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const cancelOrder = async (id: number): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.patch(
      `${API_ENDPOINT.MANAGE_ORDER.ORDER.INDEX}/cancel/${id}`,
    );

    return {
      status: 'success',
      message: 'Cancel order success.',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    console.log('error', error);
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to cancel order. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};
