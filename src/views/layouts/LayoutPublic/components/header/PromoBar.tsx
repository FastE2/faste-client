"use client";

import { useTranslation } from "react-i18next";

const PromoBar = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-purple-600 dark:bg-purple-700">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between py-2 text-white">
          <p className="text-xs sm:text-sm">
            <span className="hidden sm:inline">
              {t('promo.freeDelivery')}
            </span>
            <span className="sm:hidden">{t('promo.off')}</span>
          </p>
          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <span className="hidden sm:inline">{t('promo.untilEnd')}</span>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="text-center">
                <span className="font-bold text-sm sm:text-lg">47</span>
                <span className="text-xs block sm:inline sm:ml-1">{t('promo.days')}</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-sm sm:text-lg">06</span>
                <span className="text-xs block sm:inline sm:ml-1">{t('promo.hrs')}</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-sm sm:text-lg">59</span>
                <span className="text-xs block sm:inline sm:ml-1">{t('promo.min')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;
