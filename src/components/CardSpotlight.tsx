'use client';

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const CardSpotlightDemo = (prop: {
  name: string;
  image: string;
  owner: string;
  price: string;
}) => {
  const { name, image, owner, price } = prop;
  useEffect(() => {
    const all = document.querySelectorAll('.spotlight-card');

    const handleMouseMove = (ev: MouseEvent) => {
      all.forEach((e) => {
        const blob = e.querySelector('.blob') as HTMLElement;
        const fblob = e.querySelector('.fake-blob') as HTMLElement;

        if (!blob || !fblob) return;

        const rec = fblob.getBoundingClientRect();

        blob.style.opacity = '1';

        blob.animate(
          [
            {
              transform: `translate(${
                ev.clientX - rec.left - rec.width / 2
              }px, ${ev.clientY - rec.top - rec.height / 2}px)`,
            },
          ],
          {
            duration: 300,
            fill: 'forwards',
          },
        );
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="h-max w-max">
      <div className="spotlight-card group bg-border relative overflow-hidden rounded-xl p-px transition-all duration-300 ease-in-out">
        <Card className="group-hover:bg-card/90 max-w-80 max-h-96 h-[350px] w-[280px] bg-opacity-50 text-xs gap-y-1 p-2 border-none transition-all duration-300 ease-in-out group-hover:backdrop-blur-[20px] overflow-hidden">
          <Card className="p-1">
            <CardContent className="p-0">
              <div className="w-full rounded-2xl h-[250px]">
                <Image
                  src={image}
                  width={100}
                  height={100}
                  alt="nft"
                  className="w-full h-full"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                    borderRadius: '10px',
                  }}
                />
              </div>
              <div className="p-1">
                <div className="text-blue-800 font-semibold">{name}</div>
                <div className='text-gray-500'>@{owner}</div>
              </div>
            </CardContent>
          </Card>
          <CardContent className="flex gap-x-1 p-2">
            <div>Current bid</div>
            <div>{price} ETH</div>
          </CardContent>
        </Card>
        <div className="blob absolute start-0 top-0 h-20 w-20 rounded-full bg-sky-600/60 opacity-0 blur-2xl transition-all duration-300 ease-in-out dark:bg-sky-400/60" />
        <div className="fake-blob absolute start-0 top-0 h-20 w-20 rounded-full" />
      </div>
    </div>
  );
};

export default CardSpotlightDemo;
