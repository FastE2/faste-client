import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

vi.mock('next/image', () => ({
  default: ({ alt = '', ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
  ),
}));

import CardCategory from './CardCategory';

describe('CardCategory', () => {
  it('uses a two-row horizontal carousel with navigation controls', () => {
    const data = Array.from({ length: 12 }, (_, index) => ({
      id: index,
      name: `Category ${index}`,
    }));

    const html = renderToStaticMarkup(<CardCategory data={data} />);

    expect(html).toContain('grid-rows-2');
    expect(html).toContain('grid-flow-col');
    expect(html).toContain('aria-label="Previous categories"');
    expect(html).toContain('aria-label="Next categories"');
    expect(html.match(/data-category-card="true"/g)).toHaveLength(12);
  });
});
