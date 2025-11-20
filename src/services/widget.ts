import { API_ENDPOINT } from '@/configs/api';
import { ApiResponse } from '@/types/api-response';
import { AddWidgetBodyType, updateManyWidgetPayload } from '@/types/widget';
import axiosInstance from '@/utils/axios';

export const getAllWidgets = async (id: number): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.SELLER_STORE.WIDGET}/template/${id}`,
    );

    return {
      status: 'success',
      message: 'Fetch widget by shop success.',
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
      message: 'Unable to fetch widget by shop. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const AddWidget = async (
  data: AddWidgetBodyType,
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.post(
      `${API_ENDPOINT.SELLER_STORE.WIDGET}`,
      data,
    );

    return {
      status: 'success',
      message: 'Add widget success',
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
      message: 'Unable to add widget by shop. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const deleteWidget = async (id: number): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.delete(
      `${API_ENDPOINT.SELLER_STORE.WIDGET}/${id}`,
    );

    return {
      status: 'success',
      message: 'Delete widget success',
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
      message: 'Unable to widget by shop. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const updateManyWidgets = async (
  id: number,
  payload: updateManyWidgetPayload,
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.patch(
      `${API_ENDPOINT.SELLER_STORE.WIDGET}/template/${id}`,
      payload,
    );

    return {
      status: 'success',
      message: 'Update widget success',
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
      message: 'Unable to update widget by shop. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};
