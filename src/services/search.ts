import { API_ENDPOINT } from '@/configs/api';
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
