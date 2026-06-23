'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const GalleryLightbox = dynamic(() => import('./GalleryLightbox'), {
  ssr: false,
});

interface ProductGalleryProps {
  images: string[];
  productName?: string;
}

export function ImageGallery({
  images,
  productName = 'Product',
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    setSelectedImage(images[0]);
    setThumbnailStartIndex(0);
    setIsLightboxOpen(false);
  }, [images]);

  const visibleThumbnails = useMemo(() => {
    return images.slice(thumbnailStartIndex, thumbnailStartIndex + 5);
  }, [images, thumbnailStartIndex]);

  const canScrollPrev = thumbnailStartIndex > 0;
  const canScrollNext = thumbnailStartIndex + 5 < images.length;

  const handlePrev = () => {
    setThumbnailStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setThumbnailStartIndex((prev) =>
      Math.min(Math.max(0, images.length - 5), prev + 1),
    );
  };

  return (
    <div className="w-full">
      <div
        className="relative mx-auto mb-4 aspect-square w-full max-w-[420px] cursor-zoom-in overflow-hidden rounded-lg bg-muted lg:mx-0"
        onClick={() => setIsLightboxOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
        aria-label="Click to open image in fullscreen"
      >
        <Image
          src={selectedImage || '/placeholder.svg'}
          alt={productName}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover transition-opacity duration-300 ease-in-out"
          priority
        />
      </div>

      <div className="relative flex items-center gap-2">
        {/* Previous button */}
        <button
          onClick={handlePrev}
          disabled={!canScrollPrev}
          className="absolute left-0 z-10 rounded-full bg-white/70 p-2 shadow transition-opacity disabled:opacity-50 hover:bg-white/90 dark:bg-black/70 dark:hover:bg-black/90"
          aria-label="Previous images"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Thumbnails container */}
        <div className="flex items-center justify-between overflow-hidden max-w-full md:max-w-[420px]">
          {visibleThumbnails.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              onClick={() => setSelectedImage(img)}
              className={`flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 border-2 cursor-pointer ${
                selectedImage === img
                  ? 'border-red-500 ring-2 ring-red-300 dark:ring-red-800'
                  : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'
              }`}
              aria-label={`Select image ${thumbnailStartIndex + idx + 1}`}
            >
              <div className="relative h-20 w-20 flex-shrink-0">
                <Image
                  src={img || '/placeholder.svg'}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={80}
                  loading="lazy"
                  sizes="80px"
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          disabled={!canScrollNext}
          className="absolute right-0 z-10 rounded-full bg-white/70 p-2 shadow transition-opacity disabled:opacity-50 hover:bg-white/90 dark:bg-black/70 dark:hover:bg-black/90"
          aria-label="Next images"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        {images.indexOf(selectedImage) + 1} of {images.length}
      </p>
      {isLightboxOpen ? (
        <GalleryLightbox
          images={images}
          selectedImage={selectedImage}
          productName={productName}
          open={isLightboxOpen}
          onOpenChange={setIsLightboxOpen}
          onSelect={setSelectedImage}
        />
      ) : null}
    </div>
  );
}
