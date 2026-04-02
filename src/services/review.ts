import { API_ENDPOINT } from '@/configs/api';
import { ApiResponse } from '@/types/api-response';
import {
  CreateReviewBodyType,
  ReviewQueryType,
  ReviewType,
  UpdateReviewBodyType,
} from '@/types/review';
import axiosInstance from '@/utils/axios';

export const getAllReviews = async (
  params: ReviewQueryType,
): Promise<ApiResponse<any[]>> => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}`,
      { params },
    );

    return {
      status: 'success',
      message: 'Fetch reviews success.',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    // console.log('error', error);
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to fetch reviews. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const CreateReview = async (
  data: CreateReviewBodyType,
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.post(
      `${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}`,
      data,
    );

    return {
      status: 'success',
      message: 'success',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    // console.log('error', error);
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to create review. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const deleteWidget = async (id: number): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.delete(
      `${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/${id}`,
    );

    return {
      status: 'success',
      message: 'Delete review success',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    // console.log('error', error);
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to review. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};

export const updateReview = async (
  id: number,
  payload: UpdateReviewBodyType,
): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.patch(
      `${API_ENDPOINT.MANAGE_ORDER.REVIEW.INDEX}/${id}`,
      payload,
    );

    return {
      status: 'success',
      message: 'Update success',
      data: res.data.data,
      error: null,
      errorCode: null,
    };
  } catch (error: any) {
    // console.log('error', error);
    const errorMessage =
      error?.response?.data?.message || 'Unknown error occurred';
    const errorCode = error?.response?.status || 500;

    return {
      status: 'error',
      message: 'Unable to update review. Please try again later.',
      data: null,
      error: errorMessage,
      errorCode: errorCode,
    };
  }
};
