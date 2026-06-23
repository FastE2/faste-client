'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const BannerCarousel = dynamic(() => import('./BannerCarousel'), {
  ssr: false,
});

interface DeferredBannerProps {
  images: readonly string[];
}

export default function DeferredBanner({ images }: DeferredBannerProps) {
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const enableCarousel = () => setIsInteractive(true);
    const idleCallbackId = window.requestIdleCallback?.(enableCarousel, {
      timeout: 2_500,
    });
    const timeoutId = idleCallbackId
      ? undefined
      : window.setTimeout(enableCarousel, 2_500);

    return () => {
      if (idleCallbackId) window.cancelIdleCallback?.(idleCallbackId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  if (isInteractive) return <BannerCarousel images={images} />;

  return (
    <div className="relative aspect-[16/7] min-h-48 overflow-hidden rounded-xl md:aspect-[2/1] md:min-h-0">
      <Image
        src={images[0]}
        alt="Ưu đãi mua sắm nổi bật"
        fill
        priority
        fetchPriority="high"
        sizes="(max-width: 768px) calc(100vw - 64px), 624px"
        className="object-cover"
      />
    </div>
  );
}
