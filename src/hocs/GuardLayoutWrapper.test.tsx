import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/guards', () => ({
  default: () => {
    throw new Error('public content entered the client guard boundary');
  },
}));

import GuardLayoutWrapper from './GuardLayoutWrapper';

describe('GuardLayoutWrapper', () => {
  it('renders public content without entering the client guard boundary', () => {
    expect(() =>
      renderToStaticMarkup(
        <GuardLayoutWrapper
          authGuard={false}
          guestGuard={false}
          getLayout={(page) => page}
        >
          <p>Public content</p>
        </GuardLayoutWrapper>,
      ),
    ).not.toThrow();
  });
});
