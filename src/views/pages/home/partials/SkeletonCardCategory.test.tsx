import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { SkeletonCardCategory } from './SkeletonCardCategory';

describe('SkeletonCardCategory', () => {
  it('matches the responsive geometry of the loaded category cards', () => {
    const markup = renderToStaticMarkup(<SkeletonCardCategory />);
    const cards = markup.match(/data-category-skeleton-card="true"/g) ?? [];

    expect(cards).toHaveLength(10);
    expect(markup).toContain('w-1/4 sm:w-1/4 md:w-1/5 lg:w-1/5');
    expect(markup).toContain('h-40');
    expect(markup).toContain('p-2');
    expect(markup).toContain('max-[768px]:hidden');
    expect(markup).toContain('rounded-full w-[83px] h-[83px]');
    expect(markup).toContain('max-w-[100px]');
    expect(markup).not.toContain('w-[10%]');
  });
});
