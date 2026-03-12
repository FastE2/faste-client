import { API_ENDPOINT } from '@/configs/api';
import { TAdminProductListParams } from '@/types/admin/product';
import axiosInstance from '@/utils/axios';

export const getAdminProducts = async (params?: TAdminProductListParams) => {
  try {
    const res = await axiosInstance.get(
      `${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}`,
      {
        params,
      },
    );
    return res.data;
  } catch (error) {
    console.error('Error getting admin products:', error);
    throw new Error('Unable to fetch products. Please try again later.');
  }
};

export const updateProductStatus = async (
  productId: number,
  status: 'PUBLISHED' | 'DRAFT' | 'BANNED' | 'PENDING',
) => {
  try {
    const res = await axiosInstance.patch(
      `${API_ENDPOINT.MANAGE_PRODUCT.PRODUCT.INDEX}/${productId}/status`,
      { status },
    );
    return res.data;
  } catch (error) {
    console.error('Error updating product status:', error);
    throw new Error('Unable to update product status. Please try again later.');
  }
};
