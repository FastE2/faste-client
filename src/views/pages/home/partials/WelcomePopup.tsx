'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { getPopupShown, setPopupShown } from '@/helpers/storage';
import { X } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const IMAGE_URL =
  'https://salt.tikicdn.com/ts/tikimsp/ff/69/10/7b80a9093949c7f8f10dcc45661d64d9.png?w=600&q=75';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPopup = getPopupShown();

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        requestIdleCallback(() => {
          setIsVisible(true);
        });
      }, 1500);

      return () => clearTimeout(timer);
    }

    const img = new window.Image();
    img.src = IMAGE_URL;
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    setPopupShown('true');
  };

  return (
    isVisible && (
      <Dialog open={isVisible} onOpenChange={setIsVisible}>
        <DialogContent
          className={`
            p-0
            bg-transparent border-0 shadow-none
            flex items-center justify-center
          `}
        >
          <div
            className={`
              relative
              w-[90vw] max-w-95
              h-125
              rounded-xl
              overflow-hidden
            `}
          >
            <Button
              onClick={closePopup}
              className="absolute top-2 right-2 z-10 w-8 h-8 bg-white/60 rounded-full"
            >
              <X />
            </Button>

            <Image
              src={IMAGE_URL}
              alt="Welcome"
              fill
              sizes="(max-width: 640px) 90vw, 380px"
              className="object-cover"
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  );
};

export default WelcomePopup;
