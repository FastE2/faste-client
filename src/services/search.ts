import { API_ENDPOINT } from '@/configs/api';
import { TParamsSearch } from '@/types/params';
import axios from 'axios';

export const getSearchSuggest = async (keyword: string) => {
  try {
    const res = await axios.get(
      `${API_ENDPOINT.SEARCH.SUGGEST}?keyword=${keyword}`,
    );
    return res.data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw new Error('Unable to fetch user profile. Please try again later.');
  }
};

export const getSearchProduct = async (params: TParamsSearch) => {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.append(key, String(value));
      }
    });

    const res = await axios.get(
      `${API_ENDPOINT.SEARCH.INDEX}?${query.toString()}`,
    );

    return res.data;
  } catch (error) {
    console.error('Error fetching search products:', error);
    throw new Error('Unable to fetch products. Please try again later.');
  }
};
