import { describe, expect, it } from 'vitest';

import { createQueryClient } from './query-client';

describe('createQueryClient', () => {
  it('uses production-friendly request defaults', () => {
    const options = createQueryClient().getDefaultOptions().queries;

    expect(options?.staleTime).toBe(60_000);
    expect(options?.gcTime).toBe(30 * 60_000);
    expect(options?.refetchOnWindowFocus).toBe(false);
    expect(options?.refetchOnReconnect).toBe(false);
  });
});
