'use client';

import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

const SOCIALS = [
  ['facebook', 'bxl:facebook-circle', 'text-blue-600', 'Share Facebook'],
  ['x', 'ri:twitter-x-fill', 'text-black', 'Share X'],
  ['linkedin', 'ant-design:linkedin-filled', 'text-blue-700', 'Share LinkedIn'],
  ['pinterest', 'ant-design:pinterest-circle-filled', 'text-red-500', 'Share Pinterest'],
] as const;

const getShareUrl = (type: string, url: string) => {
  const encodedUrl = encodeURIComponent(url);
  if (type === 'facebook') return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  if (type === 'x') return `https://twitter.com/intent/tweet?url=${encodedUrl}`;
  if (type === 'linkedin') return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  return `https://pinterest.com/pin/create/button/?url=${encodedUrl}`;
};

export default function ProductDescription({
  description,
  canonicalUrl,
}: {
  description: string;
  canonicalUrl: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-white p-4 dark:bg-black">
      <div className="flex flex-col justify-between bg-gray-50 p-2 md:flex-row md:items-center md:p-0">
        <h3 className="mb-2 font-medium uppercase md:mb-0">{t('product.description')}</h3>
        <div className="flex items-center gap-x-4">
          <span className="text-sm text-gray-400">{t('common.share')}:</span>
          <div className="flex flex-wrap items-center gap-x-2">
            {SOCIALS.map(([type, icon, color, label]) => (
              <a key={type} href={getShareUrl(type, canonicalUrl)} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon icon={icon} width="32" height="32" className={color} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="py-4" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
}
