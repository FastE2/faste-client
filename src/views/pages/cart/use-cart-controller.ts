'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { toastify } from '@/components/ToastNotification';
import { setCheckoutItems } from '@/helpers/storage';
import {
  CART_QUERY_PARAMS,
  cartQueryKey,
  useGetCart,
} from '@/hooks/api/queries/useGetCart';
import {
  deleteCartItem as deleteCartItemRequest,
  getCartByMe,
  updateCartQuantity,
} from '@/services/cart.service';
import { useCartStore } from '@/stores/cart.store';
import type { UpdateCartQuantityRequest } from '@/types/cart';
import {
  createPerItemDebouncer,
  removeCartItem,
  updateCartItemQuantity,
} from './cart-state';
import type { CartItemData, CartQueryData, CartShopGroup } from './cart.types';

const queryKey = cartQueryKey(CART_QUERY_PARAMS);
const EMPTY_GROUPS: CartShopGroup[] = [];
const isCanceledRequest = (error: unknown) =>
  typeof error === 'object' &&
  error !== null &&
  (('code' in error && error.code === 'ERR_CANCELED') ||
    ('name' in error &&
      (error.name === 'AbortError' || error.name === 'CanceledError')));

export function useCartController() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const setTotalCartItem = useCartStore((state) => state.setTotalCartItem);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(() => new Set());
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const rollbackQuantities = useRef(new Map<number, number>());
  const checkoutController = useRef<AbortController | null>(null);
  const query = useGetCart(CART_QUERY_PARAMS, {
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const groups = query.data?.data ?? EMPTY_GROUPS;

  const debouncer = useMemo(
    () =>
      createPerItemDebouncer<UpdateCartQuantityRequest>(
        async (_itemId, payload, signal) => {
          try {
            await updateCartQuantity(payload, signal);
            rollbackQuantities.current.delete(payload.id);
            await queryClient.invalidateQueries({ queryKey });
          } catch (error) {
            if (isCanceledRequest(error)) return;
            const previousQuantity = rollbackQuantities.current.get(payload.id);
            rollbackQuantities.current.delete(payload.id);
            if (previousQuantity !== undefined) {
              queryClient.setQueryData<CartQueryData>(queryKey, (current) =>
                current
                  ? {
                      ...current,
                      data: updateCartItemQuantity(
                        current.data,
                        payload.id,
                        previousQuantity,
                      ),
                    }
                  : current,
              );
            }
            toastify.error('Cart', 'Unable to update quantity.');
            await queryClient.invalidateQueries({ queryKey });
            throw error;
          }
        },
        400,
      ),
    [queryClient],
  );

  useEffect(() => () => debouncer.dispose(), [debouncer]);

  const changeQuantity = useCallback(
    (id: number, skuId: number, quantity: number) => {
      queryClient.setQueryData<CartQueryData>(queryKey, (current) => {
        if (!current) return current;
        if (!rollbackQuantities.current.has(id)) {
          const existing = current.data
            .flatMap((group) => group.cartItems)
            .find((item) => item.id === id);
          if (existing) rollbackQuantities.current.set(id, existing.quantity);
        }
        return {
          ...current,
          data: updateCartItemQuantity(current.data, id, quantity),
        };
      });
      debouncer.schedule(id, { id, skuId, quantity });
    },
    [debouncer, queryClient],
  );

  const removeItem = useCallback(
    async (id: number) => {
      debouncer.cancel(id);
      rollbackQuantities.current.delete(id);
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<CartQueryData>(queryKey);
      if (!previous) return;
      const wasSelected = selectedIds.has(id);
      const nextGroups = removeCartItem(previous.data, id);
      queryClient.setQueryData<CartQueryData>(queryKey, {
        ...previous,
        data: nextGroups,
        totalItem: Math.max(0, (previous.totalItem ?? 1) - 1),
      });
      setSelectedIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
      setTotalCartItem(nextGroups.flatMap((group) => group.cartItems).length);
      try {
        await deleteCartItemRequest(id);
      } catch (error) {
        queryClient.setQueryData(queryKey, previous);
        if (wasSelected) {
          setSelectedIds((current) => new Set(current).add(id));
        }
        setTotalCartItem(
          previous.data.flatMap((group) => group.cartItems).length,
        );
        toastify.error('Cart', 'Unable to remove item.');
        await queryClient.invalidateQueries({ queryKey });
      }
    },
    [debouncer, queryClient, selectedIds, setTotalCartItem],
  );

  const selectItem = useCallback((id: number, selected: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (selected) next.add(id);
      else next.delete(id);
      return next;
    });
  }, []);

  const selectShop = useCallback((group: CartShopGroup, selected: boolean) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      group.cartItems.forEach((item) =>
        selected ? next.add(item.id) : next.delete(item.id),
      );
      return next;
    });
  }, []);

  const selectAll = useCallback(
    (selected: boolean) => {
      setSelectedIds(
        selected
          ? new Set(
              groups.flatMap((group) => group.cartItems.map((item) => item.id)),
            )
          : new Set(),
      );
    },
    [groups],
  );

  const selectedItems = useMemo(
    () =>
      groups
        .flatMap((group) => group.cartItems)
        .filter((item) => selectedIds.has(item.id)),
    [groups, selectedIds],
  );
  const subtotal = useMemo(
    () =>
      selectedItems.reduce(
        (total, item) => total + item.sku.price * item.quantity,
        0,
      ),
    [selectedItems],
  );

  const checkout = useCallback(async () => {
    if (isCheckingOut || selectedIds.size === 0) return;
    setIsCheckingOut(true);
    try {
      await debouncer.flushAll();
      checkoutController.current?.abort();
      const controller = new AbortController();
      checkoutController.current = controller;
      const response = await getCartByMe(CART_QUERY_PARAMS, controller.signal);
      const fresh = response.data as CartQueryData;
      const checkoutGroups = fresh.data
        .map((group: CartShopGroup) => ({
          ...group,
          cartItems: group.cartItems.filter((item: CartItemData) =>
            selectedIds.has(item.id),
          ),
        }))
        .filter((group: CartShopGroup) => group.cartItems.length > 0);
      if (checkoutGroups.length === 0) {
        toastify.info('Cart', 'Selected items are no longer available.');
        await queryClient.invalidateQueries({ queryKey });
        return;
      }
      queryClient.setQueryData(queryKey, fresh);
      setCheckoutItems(checkoutGroups);
      router.push('/checkout');
    } catch (error) {
      if (!isCanceledRequest(error)) {
        toastify.error('Cart', 'Unable to prepare checkout.');
      }
    } finally {
      setIsCheckingOut(false);
    }
  }, [debouncer, isCheckingOut, queryClient, router, selectedIds]);

  return {
    groups,
    selectedIds,
    selectedItems,
    subtotal,
    total: subtotal,
    isLoading: query.isLoading,
    isCheckingOut,
    changeQuantity,
    removeItem,
    selectItem,
    selectShop,
    selectAll,
    checkout,
  };
}
