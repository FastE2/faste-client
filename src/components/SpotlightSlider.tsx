'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import CardSpotlightDemo from '@/components/CardSpotlight';

const cards = [1, 2, 3]; // dummy array 3 phần tử

const cardItems = [
  {
    name: 'Solitaire - Tri Peaks',
    image: '/nftt-1.png',
    owner: 'aslanruby',
    price: '0.38',
  },
  {
    name: 'Solitaire - Tri Peaks',
    image: '/nftt-2.png',
    owner: 'aslanruby',
    price: '0.38',
  },
  {
    name: 'Solitaire - Tri Peaks',
    image: '/nftt.png',
    owner: 'aslanruby',
    price: '0.38',
  },
];

export default function SpotlightSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full py-10 overflow-visible">
      <Swiper
        initialSlide={1}
        modules={[Navigation]}
        slidesPerView={3}
        spaceBetween={30}
        centeredSlides={true}
        allowTouchMove
        navigation
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="max-w-[880px] overflow-visible"
      >
        {cardItems.map((item, i) => (
          <SwiperSlide key={i}>
            <div
              className={`
                transition-transform duration-300 
                ${i === activeIndex ? 'scale-100 opacity-100 z-10' : 'scale-75 opacity-30 z-0'}
              `}
            >
              <CardSpotlightDemo
                image={item.image}
                name={item.name}
                owner={item.owner}
                price={item.price}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx>{`
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          top: 50% !important;
          transform: translateY(-50%);
        }
        :global(.swiper-button-next) {
          right: 1px !important;
          width: 10px !important;
        }
        :global(.swiper-button-prev) {
          left: 1px !important;
          width: 10px !important;
        }
        :global(.swiper-slide) {
          margin-right: 0px !important;
          width: auto !important;
        }
        :global(.swiper-wrapper) {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
      `}</style>
    </div>
  );
}
