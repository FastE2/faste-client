import { QUERY_KEYS } from '@/constants/query-keys';
import { getAllCategories } from '@/services/category.service';
import { TParamsGets } from '@/types/common';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useGetCategories = (
  params: TParamsGets,
  options?: Omit<UseQueryOptions<any>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES, params],
    queryFn: async ({ signal }) => {
      const response = await getAllCategories(params, signal);
      return response.data;
    },
    ...options,
  });
};
