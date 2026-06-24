import { QUERY_KEYS } from '@/constants/query-keys';
import { getCartByMe } from '@/services/cart.service';
import { useCartStore } from '@/stores/cart.store';
import { TParamsGets } from '@/types/common';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import type { CartQueryData } from '@/views/pages/cart/cart.types';

export const CART_QUERY_PARAMS = { page: 1, limit: 10 } as const;
export const cartQueryKey = (params: TParamsGets = CART_QUERY_PARAMS) =>
  [QUERY_KEYS.CART, params] as const;

export const useGetCart = <TData = CartQueryData>(
  params: TParamsGets,
  options?: Omit<
    UseQueryOptions<CartQueryData, Error, TData>,
    'queryKey' | 'queryFn'
  >,
) => {
  const setTotalCartItem = useCartStore((s) => s.setTotalCartItem);
  return useQuery({
    queryKey: cartQueryKey(params),
    queryFn: async ({ signal }) => {
      const response = await getCartByMe(params, signal);
      setTotalCartItem(response.data?.totalItem || 0);
      return response.data as CartQueryData;
    },
    ...options,
  });
};
