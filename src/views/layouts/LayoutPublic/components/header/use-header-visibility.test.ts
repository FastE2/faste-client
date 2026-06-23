import { describe, expect, it } from 'vitest';

import { getHeaderVisibility } from './use-header-visibility';

const visibilityFor = (
  currentScrollY: number,
  previousScrollY: number,
  isVisible = true,
) =>
  getHeaderVisibility({
    currentScrollY,
    previousScrollY,
    isVisible,
  });

describe('getHeaderVisibility', () => {
  it('keeps the initial state visible when scroll position has not changed', () => {
    expect(visibilityFor(320, 320)).toBe(true);
  });

  it('always shows the header within 10px of the top', () => {
    expect(visibilityFor(10, 20, false)).toBe(true);
  });

  it('keeps the header visible while scrolling down at the 80px boundary', () => {
    expect(visibilityFor(80, 70)).toBe(true);
  });

  it('hides the header while scrolling down past 80px', () => {
    expect(visibilityFor(81, 80)).toBe(false);
  });

  it('shows the header immediately when scrolling up', () => {
    expect(visibilityFor(200, 220, false)).toBe(true);
  });

  it('retains visibility when there is no directional movement', () => {
    expect(visibilityFor(200, 200, false)).toBe(false);
  });
});
