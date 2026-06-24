'use client';

import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const HERO_IMAGE =
  'https://salt.tikicdn.com/cache/w750/ts/tikimsp/cb/3f/52/5ed5314cabc00d10d36c789df95b4348.png.webp';

const SLIDES = [
  'https://salt.tikicdn.com/cache/w750/ts/tikimsp/a8/2a/88/3ba09c5a662677b72cf8263dbd4ab56e.png.webp',
  'https://salt.tikicdn.com/cache/w750/ts/tikimsp/8c/a7/e5/a95e0e2b29839fad6ade9e67b812dd23.png.webp',
  'https://salt.tikicdn.com/cache/w750/ts/tikimsp/fa/24/87/4daa3133468283a826bb863e733f0ec8.png.webp',
  'https://salt.tikicdn.com/cache/w750/ts/tikimsp/62/65/2f/1382aac2b64e019f76fb155610805826.png.webp',
  'https://salt.tikicdn.com/cache/w750/ts/tikimsp/4e/b2/be/38cddd899e0897b09d7167fccd90a25a.png.webp',
];

const BannerWeb = () => {
  return (
    <div className="bg-white dark:bg-black w-full mb-5 p-4">
      <div className="w-full space-y-4">
        <Swiper
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={20}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="rounded-xl"
        >
          {SLIDES.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="h-76.5 relative rounded-xl overflow-hidden">
                <Image
                  src={`${img}?w=800&q=75`}
                  alt={`Slide ${index + 1}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerWeb;