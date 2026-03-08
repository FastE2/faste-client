import { ProductRating } from '@/components/ProductRating';
import { getAllReviews } from '@/services/review';
import { memo, useState, useEffect } from 'react';
import { ReviewCard } from './ReviewCard';
import { useTranslation } from 'react-i18next';

export const ProductReviews = memo(({ product }: { product: any }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const {t} = useTranslation();

  const fetchReviewsByProduct = async () => {
    if (product) {
      setLoading(true);
      const res = await getAllReviews({
        page: 1,
        limit: 5,
        productId: Number(product.id),
        order: 'asc',
        sortBy: 'createdAt',
        rating: selectedRating !== null ? selectedRating : undefined,
      });
      console.log('fetchReviewsByProduct', res);
      if (res?.data) {
        setReviews(res.data);
      }
      setLoading(false);
    }
  };

  const FILLTER_REVIEW: { value: any; text: string }[] = [
    // {
    //   value: 0,
    //   text: 'Mới nhất',
    // },
    {
      value: null,
      text: 'Tất cả',
    },
    {
      value: 1,
      text: '1 sao',
    },
    {
      value: 2,
      text: '2 sao',
    },
    {
      value: 3,
      text: '3 sao',
    },
    {
      value: 4,
      text: '4 sao',
    },
    {
      value: 5,
      text: '5 sao',
    },
  ];

  useEffect(() => {
    fetchReviewsByProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.id, selectedRating]);

  const handleRatingFilter = (rating: number | null) => {
    setSelectedRating(rating);
  };

  return (
    <div className="flex flex-col items-start w-full p-4 bg-white dark:bg-black">
      <div className="uppercase font-medium mb-4">{t('product.reviews')}</div>

      <div className="bg-red-50 w-full mb-4 px-4 py-4 flex items-start gap-x-4">
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-xl font-medium">
            <span className="text-3xl">{product.rating}</span> trên 5
          </div>
          <ProductRating rating={product.rating ?? 0} size={18} />
        </div>
        <div className="flex gap-x-4 mb-4">
          {FILLTER_REVIEW.map((item) => (
            <button
              key={item.value + item.text}
              onClick={() =>
                handleRatingFilter(item.value === 0 ? null : item.value)
              }
              className={`${
                selectedRating === (item.value === 0 ? null : item.value)
                  ? 'border border-red-300 bg-white'
                  : 'bg-white text-gray-700 '
              } py-1 px-4 rounded-md`}
            >
              {`${item.text}`}
            </button>
          ))}
        </div>
      </div>

      {/* Review cards */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} skus={product.skus} />
            ))
          ) : (
            <div className="text-center text-gray-600">No reviews yet.</div>
          )}
        </div>
      )}
    </div>
  );
});

ProductReviews.displayName = 'ProductReviews';
