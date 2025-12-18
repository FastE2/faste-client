import { Rating, RatingButton } from "./ui/shadcn-io/rating";

type ProductRatingProps = {
  rating?: number;
  size?: number;
};

export const ProductRating = ({
  rating = 0,
  size = 18,
}: ProductRatingProps) => {
  return (
    <Rating defaultValue={rating} readOnly className="gap-x-0">
      {Array.from({ length: 5 }).map((_, index) => (
        <RatingButton key={index} size={size} className="text-yellow-500" />
      ))}
    </Rating>
  );
};
