'use client';

import Image from 'next/image';
import { Dialog, DialogContent } from '@/components/ui/dialog';

type Props = {
  images: string[];
  selectedImage: string;
  productName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (image: string) => void;
};

export default function GalleryLightbox({
  images,
  selectedImage,
  productName,
  open,
  onOpenChange,
  onSelect,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center rounded-none border-none bg-black/95 p-0">
        <div className="flex h-[90vh] w-full max-w-[1200px] flex-col items-center justify-center gap-6 px-4 py-8 md:h-[80vh] md:flex-row">
          <div className="hidden h-full w-[90px] flex-col gap-2 overflow-y-auto pl-2 md:flex">
            {images.map((image, index) => (
              <Thumbnail
                key={`${image}-${index}`}
                image={image}
                index={index}
                selected={selectedImage === image}
                onSelect={onSelect}
              />
            ))}
          </div>
          <div className="hide-scrollbar flex w-full gap-2 overflow-x-auto py-2 md:hidden">
            {images.map((image, index) => (
              <Thumbnail
                key={`${image}-${index}`}
                image={image}
                index={index}
                selected={selectedImage === image}
                onSelect={onSelect}
                mobile
              />
            ))}
          </div>
          <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden">
            <Image
              src={selectedImage}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="z-10 object-contain transition-opacity duration-300"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 cursor-pointer rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
          aria-label="Close fullscreen"
        >
          ✕
        </button>
      </DialogContent>
    </Dialog>
  );
}

function Thumbnail({
  image,
  index,
  selected,
  onSelect,
  mobile = false,
}: {
  image: string;
  index: number;
  selected: boolean;
  onSelect: (image: string) => void;
  mobile?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(image)}
      className={`relative flex-shrink-0 overflow-hidden rounded-md border-2 transition-all duration-200 ${
        mobile ? 'h-16 w-16' : 'h-20 w-20'
      } ${selected ? 'border-red-500 ring-2 ring-red-300' : 'border-transparent hover:border-gray-400'}`}
      aria-label={`Select fullscreen image ${index + 1}`}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={mobile ? '64px' : '80px'}
        className="object-cover"
      />
    </button>
  );
}
