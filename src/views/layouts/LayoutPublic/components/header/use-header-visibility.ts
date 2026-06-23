'use client';

import { useEffect, useRef, useState } from 'react';

type HeaderVisibilityState = {
  currentScrollY: number;
  previousScrollY: number;
  isVisible: boolean;
};

type UseHeaderVisibilityOptions = {
  disabled?: boolean;
};

const TOP_THRESHOLD = 10;
const HIDE_THRESHOLD = 80;

export function getHeaderVisibility({
  currentScrollY,
  previousScrollY,
  isVisible,
}: HeaderVisibilityState) {
  if (currentScrollY <= TOP_THRESHOLD) {
    return true;
  }

  if (currentScrollY > previousScrollY && currentScrollY > HIDE_THRESHOLD) {
    return false;
  }

  if (currentScrollY < previousScrollY) {
    return true;
  }

  return isVisible;
}

export function useHeaderVisibility({
  disabled = false,
}: UseHeaderVisibilityOptions = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const previousScrollYRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    previousScrollYRef.current = Math.max(window.scrollY, 0);

    if (disabled) {
      setIsVisible(true);
      return;
    }

    const updateVisibility = () => {
      const currentScrollY = Math.max(window.scrollY, 0);

      setIsVisible((currentVisibility) =>
        getHeaderVisibility({
          currentScrollY,
          previousScrollY: previousScrollYRef.current,
          isVisible: currentVisibility,
        }),
      );

      previousScrollYRef.current = currentScrollY;
      animationFrameRef.current = null;
    };

    const handleScroll = () => {
      if (animationFrameRef.current === null) {
        animationFrameRef.current =
          window.requestAnimationFrame(updateVisibility);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [disabled]);

  return isVisible;
}
