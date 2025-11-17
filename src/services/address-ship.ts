import { API_ENDPOINT } from '@/configs/api';
import { ApiResponse } from '@/types/api-response';
import axiosInstance from '@/utils/axios';

export const getAddressShipIsDefaultUser = async (
  id: number,
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.ADDRESS_SHIP.INDEX}/default/${id}`,
    );

    return {
      status: 'success',
      message: 'Fetch address ship default by user success.',
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
      message:
        'Unable to fetch address ship default by user. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};
