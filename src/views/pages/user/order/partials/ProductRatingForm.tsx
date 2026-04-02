'use client';

import { memo, useEffect, useId, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Icon } from '@iconify/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getDetailOrderById } from '@/services/order';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { CreateReview } from '@/services/review';
import { toast } from 'sonner';
import { toastify } from '@/components/ToastNotification';
import { ReasonType } from '@/types/review';
import { useTranslation } from 'react-i18next';


interface ProductRatingFormProps {
  id: number | null;
  open: boolean;
  onClose: () => void;
}

interface FormData {
  rating: number;
  message: string;
  reason: ReasonType | null;
  serviceSeller: number;
  serviceShip: number;
  images: File[];
  isAnonymous: boolean;
}

export interface ProductOrderItem {
  id: number;
  orderId: number;
  productId: number;
  skuId: number;
  productName: string;
  productTranslations: Array<any>;
  quantity: number;
  skuPrice: number;
  skuAttributes: Record<string, string>;
  image: string;
  createdAt: string;
  userId: number;
  shopId: number;
}




const ProductRatingForm = memo(function ProductRatingForm({
  id,
  open,
  onClose,
}: ProductRatingFormProps) {
  const { t } = useTranslation();
  const [productOrder, setProductOrder] = useState<ProductOrderItem>();

  const badReasons = [
    {
      value: 'DAMAGED_PRODUCT',
      label: t('order.rating.reasons.damaged'),
    },
    {
      value: 'FAKE_PRODUCT',
      label: t('order.rating.reasons.fake'),
    },
    {
      value: 'NOT_AS_DESCRIBED',
      label: t('order.rating.reasons.notAsDescribed'),
    },
    {
      value: 'POOR_QUALITY',
      label: t('order.rating.reasons.poorQuality'),
    },
  ];

  const ratingStatus: Record<number, string> = {
    1: t('order.rating.vVeryBad'),
    2: t('order.rating.vBad'),
    3: t('order.rating.vOk'),
    4: t('order.rating.vGood'),
    5: t('order.rating.vExcellent'),
  };

  const schema = useMemo(() => yup.object({
    rating: yup.number().required(),
    message: yup.string().max(100, t('order.rating.maxChars', { count: 100 })).default(''),
    reason: yup
      .string()
      .oneOf([
        'DAMAGED_PRODUCT',
        'FAKE_PRODUCT',
        'NOT_AS_DESCRIBED',
        'POOR_QUALITY',
      ])
      .nullable()
      .default(null)
      .when('rating', {
        is: (v: number) => v <= 2,
        then: (s) => s.required(t('order.rating.selectReasonError')),
        otherwise: (s) => s.default(null),
      }),
    serviceSeller: yup.number().required(),
    serviceShip: yup.number().required(),
    images: yup
      .mixed<File[]>()
      .test('max-5', t('order.rating.maxImagesError', { count: 5 }), (value) => {
        if (!value) return true;
        return value.length <= 5;
      })
      .required(),
    isAnonymous: yup.boolean().default(false),
  }), [t]);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      rating: 5,
      message: '',
      reason: null,
      serviceSeller: 5,
      serviceShip: 5,
      images: [],
      isAnonymous: false,
    },
  });

  const rating = watch('rating');
  const seller = watch('serviceSeller');
  const ship = watch('serviceShip');

  const onSubmit = async (data: FormData) => {
    // console.log('Form Submitted:', data);

    const orderItemId = productOrder!.id;
    const productId = productOrder!.productId;
    const skuId = productOrder?.skuId ?? null;
    const sellerId = productOrder!.shopId;
    try {
      const { images, ...rest } = data;
      // console.log({
      //   orderItemId,
      //   productId,
      //   sellerId,
      //   skuId,
      //   images: [],
      //   ...rest,
      // });
      const res = await CreateReview({
        orderItemId,
        productId,
        sellerId,
        skuId,
        images: [],
        ...rest,
      });
      if (!res.error) {
        toastify.success('', t('order.rating.success'));
      } else {
        toastify.error('', t('order.rating.failed'));
      }
    } catch (error) {
      toastify.error('', t('order.rating.failed'));
    } finally {

      onClose();
      reset();
    }
  };

  const fetchDetailOrder = async (id: number) => {
    try {
      const res = await getDetailOrderById(id);
      setProductOrder({ ...res.data.items[0], shopId: res.data.shopId });
    } catch (error) {}
  };

  const renderStars = (value: number, onChange: (v: number) => void) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Icon
          key={i}
          icon="mdi:star"
          width={32}
          className="cursor-pointer transition"
          onClick={() => onChange(i)}
          style={{
            color: i <= value ? '#FFD700' : '#D1D5DB',
          }}
        />
      ))}
    </div>
  );

  useEffect(() => {
    if (id) {
      fetchDetailOrder(id);
    }
  }, [id]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[min(700px,80vh)] flex-col gap-0 p-0 sm:max-w-xl">
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl px-6 pt-6">
              {t('order.rating.title')}
            </DialogTitle>
            <div className="px-6">
              {productOrder && (
                <div className="flex gap-4 p-2 border">
                  <div className="w-16 h-16 flex-shrink-0">
                    {productOrder.image ? (
                      <Image
                        width={64}
                        height={64}
                        src={productOrder?.image}
                        alt={productOrder?.productName}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded">
                        <Icon
                          icon="mdi:image-broken-variant"
                          width={32}
                          className="text-gray-400"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div className="font-medium text-base line-clamp-1">
                      {productOrder.productName}
                    </div>

                    <div className="text-sm text-gray-600">
                      <div className="font-semibold">{t('common.category')}:</div>
                      <div>
                        {Object.entries(productOrder.skuAttributes).map(
                          ([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-gray-500">{key}: </span>
                              <span>{value}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </DialogHeader>

          <form
            id="rating-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-4 p-6"
          >
            <div className="flex items-center">
              <p className="font-medium mb-2 w-44">{t('order.rating.productQuality')}</p>

              <Controller
                control={control}
                name="rating"
                render={({ field }) => renderStars(field.value, field.onChange)}
              />

              <p className="text-sm text-[#FED600]">{ratingStatus[rating]}</p>

              {errors.rating && (
                <p className="text-red-500 text-sm">{t('order.rating.selectStarsError')}</p>
              )}
            </div>

            {rating <= 2 && (
              <div className="border rounded-lg p-3 bg-red-50">
                <p className="font-medium text-red-700 mb-2">
                  {t('order.rating.lowRatingReason')}
                </p>

                <Controller
                  control={control}
                  name="reason"
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      {badReasons.map((item) => (
                        <label
                          key={item.value}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            value={item.value}
                            checked={field.value === item.value}
                            onChange={() => field.onChange(item.value)}
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />

                {errors.reason && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.reason.message}
                  </p>
                )}
              </div>
            )}

            <div className="bg-red-50 p-2">
              <div className="bg-white rounded-sm mb-2">
                <Controller
                  control={control}
                  name="message"
                  render={({ field }) => (
                    <>
                      <Textarea
                        placeholder={t('order.rating.placeholder')}
                        maxLength={100}
                        {...field}
                      />
                      <p className="text-sm text-gray-500 mt-1 p-1">
                        {t('order.rating.charsRemaining', { count: 100 - field.value.length })}
                      </p>
                    </>
                  )}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div>
                <p className="font-medium mb-2">
                  {t('order.rating.imageUploadTitle')}
                </p>

                <Controller
                  control={control}
                  name="images"
                  render={({ field }) => {
                    const handleSelectImages = (
                      e: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                      const files = e.target.files
                        ? Array.from(e.target.files)
                        : [];
                      const combined = [...field.value, ...files].slice(0, 5);
                      field.onChange(combined);
                    };

                    const handleRemove = (index: number) => {
                      const newImages = field.value.filter(
                        (_, i) => i !== index,
                      );
                      field.onChange(newImages);
                    };

                    return (
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap gap-3">
                          {field.value.map((file, index) => (
                            <div
                              key={index}
                              className="relative w-12 h-12 border rounded bg-gray-100 flex items-center justify-center"
                            >
                              <Image
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                fill
                                className="object-cover rounded"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs cursor-pointer"
                              >
                                ✕
                              </button>
                            </div>
                          ))}

                          {field.value.length < 5 && (
                            <label className="w-12 h-12 border rounded flex items-center justify-center cursor-pointer hover:bg-gray-50 bg-white">
                              <Icon
                                icon="mdi:camera-plus"
                                width={28}
                                className="text-gray-500"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleSelectImages}
                              />
                            </label>
                          )}
                          <label className="w-12 h-12 border rounded flex items-center justify-center cursor-pointer hover:bg-gray-50 bg-white">
                            <Icon
                              icon="ic:baseline-video-call"
                              width={28}
                              className="text-gray-500"
                            />
                            <input
                              type="file"
                              accept="video/*"
                              multiple
                              className="hidden"
                            />
                          </label>
                        </div>

                        {errors.images && (
                          <p className="text-red-500 text-sm">
                            {errors.images.message}
                          </p>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Controller
                control={control}
                name="isAnonymous"
                render={({ field }) => (
                  <Checkbox
                    id="is-anonymous"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="cursor-pointer"
                  />
                )}
              />
              <label
                htmlFor="is-anonymous"
                className="text-sm cursor-pointer select-none"
              >
                {t('order.rating.anonymousLabel')}
              </label>
            </div>

            <div>
              <div className="font-medium mb-2">{t('order.rating.serviceSection')}</div>
              <div className="flex items-center ml-2">
                <p className="text-sm mb-2 w-44">{t('order.rating.sellerService')}</p>
                <Controller
                  control={control}
                  name="serviceSeller"
                  render={({ field }) =>
                    renderStars(field.value, field.onChange)
                  }
                />
                <p className="text-sm text-[#FED600]">{ratingStatus[seller]}</p>
              </div>

              <div className="flex items-center ml-2">
                <p className="text-sm mb-2 w-44">{t('order.rating.shipService')}</p>
                <Controller
                  control={control}
                  name="serviceShip"
                  render={({ field }) =>
                    renderStars(field.value, field.onChange)
                  }
                />
                <p className="text-sm text-[#FED600]">{ratingStatus[ship]}</p>
              </div>
            </div>
          </form>
        </ScrollArea>
        <DialogFooter className="border-t p-4 flex-shrink-0">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              {t('order.rating.cancel')}
            </Button>
          </DialogClose>
          <Button type="submit" form="rating-form" className="cursor-pointer">
            {t('order.rating.submit')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
});

export default ProductRatingForm;
