import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({ priority, fill, ...props }: Record<string, unknown>) => (
    <span
      data-image="true"
      data-priority={priority ? 'true' : 'false'}
      data-fill={fill ? 'true' : 'false'}
      {...props}
    />
  ),
}));

import { ImageGallery } from './ImageGallery';

describe('ImageGallery', () => {
  it('eagerly prioritizes only the reserved hero image', () => {
    const html = renderToStaticMarkup(
      <ImageGallery images={['hero.webp', 'alternate.webp']} productName="Hat" />,
    );

    expect(html).toContain('data-priority="true"');
    expect(html.match(/data-priority="true"/g)).toHaveLength(1);
    expect(html).toContain('data-fill="true"');
    expect(html).toContain('sizes="(max-width: 1024px) 100vw, 40vw"');
    expect(html).toContain('aspect-square');
  });
});
