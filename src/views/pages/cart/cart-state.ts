import type { CartShopGroup } from './cart.types';

export function updateCartItemQuantity(
  groups: CartShopGroup[],
  itemId: number,
  quantity: number,
) {
  return groups.map((group) => {
    const itemIndex = group.cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex < 0) return group;
    const cartItems = [...group.cartItems];
    cartItems[itemIndex] = { ...cartItems[itemIndex], quantity };
    return { ...group, cartItems };
  });
}

export function removeCartItem(groups: CartShopGroup[], itemId: number) {
  return groups
    .map((group) => {
      if (!group.cartItems.some((item) => item.id === itemId)) return group;
      return {
        ...group,
        cartItems: group.cartItems.filter((item) => item.id !== itemId),
      };
    })
    .filter((group) => group.cartItems.length > 0);
}

type Pending<T> = {
  payload: T;
  controller: AbortController;
  timer: ReturnType<typeof setTimeout>;
};

export function createPerItemDebouncer<T>(
  handler: (key: number, payload: T, signal: AbortSignal) => Promise<void>,
  delay: number,
) {
  const pending = new Map<number, Pending<T>>();
  const running = new Set<Promise<void>>();
  const runningControllers = new Map<number, AbortController>();

  const execute = (key: number, entry: Pending<T>) => {
    if (pending.get(key) === entry) pending.delete(key);
    runningControllers.set(key, entry.controller);
    const operation = handler(key, entry.payload, entry.controller.signal);
    running.add(operation);
    const cleanup = () => {
      running.delete(operation);
      if (runningControllers.get(key) === entry.controller) {
        runningControllers.delete(key);
      }
    };
    void operation.then(cleanup, cleanup);
    return operation;
  };

  return {
    schedule(key: number, payload: T) {
      const previous = pending.get(key);
      if (previous) {
        clearTimeout(previous.timer);
        previous.controller.abort();
      }
      runningControllers.get(key)?.abort();
      const controller = new AbortController();
      const entry = {} as Pending<T>;
      entry.payload = payload;
      entry.controller = controller;
      entry.timer = setTimeout(
        () => void execute(key, entry).catch(() => undefined),
        delay,
      );
      pending.set(key, entry);
    },
    cancel(key: number) {
      const entry = pending.get(key);
      if (entry) {
        clearTimeout(entry.timer);
        entry.controller.abort();
        pending.delete(key);
      }
      runningControllers.get(key)?.abort();
    },
    async flushAll() {
      const operations = [...pending.entries()].map(([key, entry]) => {
        clearTimeout(entry.timer);
        return execute(key, entry);
      });
      await Promise.all([...operations, ...running]);
    },
    dispose() {
      pending.forEach((entry) => {
        clearTimeout(entry.timer);
        entry.controller.abort();
      });
      pending.clear();
      runningControllers.forEach((controller) => controller.abort());
      runningControllers.clear();
    },
  };
}
