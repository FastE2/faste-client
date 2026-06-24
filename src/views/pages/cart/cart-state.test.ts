import { describe, expect, it, vi } from 'vitest';

import {
  createPerItemDebouncer,
  removeCartItem,
  updateCartItemQuantity,
} from './cart-state';
import type { CartShopGroup } from './cart.types';

const groups: CartShopGroup[] = [
  {
    shop: { shopid: 1, name: 'Shop one' },
    cartItems: [
      {
        id: 10,
        skuId: 100,
        quantity: 1,
        sku: {
          id: 100,
          price: 12,
          quantity: 5,
          attributes: {},
          product: { name: 'Hat', images: ['hat.webp'] },
        },
      },
    ],
  },
  {
    shop: { shopid: 2, name: 'Shop two' },
    cartItems: [
      {
        id: 20,
        skuId: 200,
        quantity: 2,
        sku: {
          id: 200,
          price: 15,
          quantity: 6,
          attributes: {},
          product: { name: 'Bag', images: ['bag.webp'] },
        },
      },
    ],
  },
];

describe('cart cache updates', () => {
  it('updates only the affected shop and item references', () => {
    const next = updateCartItemQuantity(groups, 10, 3);

    expect(next[0]).not.toBe(groups[0]);
    expect(next[0].cartItems[0].quantity).toBe(3);
    expect(next[1]).toBe(groups[1]);
  });

  it('removes empty shops optimistically', () => {
    expect(removeCartItem(groups, 10)).toEqual([groups[1]]);
  });
});

describe('per-item debounce', () => {
  it('sends only the latest update for one item', async () => {
    vi.useFakeTimers();
    const handler = vi.fn().mockResolvedValue(undefined);
    const debouncer = createPerItemDebouncer(handler, 400);

    debouncer.schedule(10, { quantity: 2 });
    debouncer.schedule(10, { quantity: 3 });
    await vi.advanceTimersByTimeAsync(400);

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler.mock.calls[0][1]).toEqual({ quantity: 3 });
    vi.useRealTimers();
  });

  it('debounces different items independently', async () => {
    vi.useFakeTimers();
    const handler = vi.fn().mockResolvedValue(undefined);
    const debouncer = createPerItemDebouncer(handler, 400);

    debouncer.schedule(10, { quantity: 2 });
    debouncer.schedule(20, { quantity: 4 });
    await vi.advanceTimersByTimeAsync(400);

    expect(handler).toHaveBeenCalledTimes(2);
    vi.useRealTimers();
  });
});
