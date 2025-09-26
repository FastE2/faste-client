'use client';

import InputNumberCustom from '@/components/InputNumberCustom';
import { Rating, RatingButton } from '@/components/ui/shadcn-io/rating';
import Image from 'next/image';
import {
  useState,
  useMemo,
} from 'react';

type TProps = {
  product: any;
};

type TVariant = {
  value: string;
  options: string[];
};

const ProductDetails = (props: TProps) => {
  const { product } = props;

  const [selected, setSelected] = useState<Record<string, string>>({});

  const matchedSku = useMemo(() => {
    if (!product?.skus) return undefined;

    return product.skus.find((sku: any) => {
      return Object.entries(selected).every(
        ([key, val]) => sku.attributes[key] === val,
      );
    });
  }, [product?.skus, selected]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // **  Calculate total sold
  function handleTotalSold(skus: any): number {
    return skus.reduce((acc: any, sku: { sold: number }) => acc + sku.sold, 0);
  }
  // ** Handle select variant option
  const handleSelect = (variantName: string, option: string) => {
    setSelected((prev) => {
      if (prev[variantName] === option) {
        const newState = { ...prev };
        delete newState[variantName];
        return newState;
      }
      return { ...prev, [variantName]: option };
    });
  };


  // console.log('product', matchedSku);

  console.log('ProductDetails -> product', product);
  // console.log('skus attributes', product.skus[0].attributes);
  // console.log('selected', selected);
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between bg-white dark:bg-black w-full p-4">
        <div className="w-2/5">
          <Image
            width={100}
            height={100}
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg my-4"
          />
        </div>
        <div className="w-3/5">
          <h5 className="text-3xl font-bold">{product.name}</h5>
          <div className="flex items-center gap-x-2 my-2">
            <Rating defaultValue={3} readOnly className="gap-x-0">
              {Array.from({ length: 5 }).map((_, index) => (
                <RatingButton
                  className="text-yellow-500"
                  key={index}
                  size={12}
                />
              ))}
            </Rating>
            <div className="h-4 w-[1px] bg-gray-400"></div>
            <div>510 Đánh giá</div>
            <div className="h-4 w-[1px] bg-gray-400"></div>
            <div>Đã bán {handleTotalSold(product.skus)}</div>
          </div>

          <p className="text-gray-600">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.basePrice}</p>
          {product.skus &&
            product.skus.length &&
            product.variants.length > 0 &&
            product.variants.map((variant: TVariant, index: number) => (
              <div key={index}>
                <h3 className="font-semibold mb-2">{variant.value}:</h3>
                <div className="flex gap-2 flex-wrap">
                  {variant.options.map((opt: string) => {
                    const isActive = selected[variant.value] === opt;
                    return (
                      <button
                        key={opt}
                        className={`px-3 py-1 border rounded-lg hover:bg-gray-200 ${isActive ? 'bg-red-500 text-white' : 'bg-white'}`}
                        onClick={() => handleSelect(variant.value, opt)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          <div className="mt-4">
            <p className="font-semibold">Kết quả SKU:</p>
            {matchedSku ? (
              <pre className="bg-green-100 p-2 rounded">
                {JSON.stringify(matchedSku, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-500">Chưa match SKU nào</p>
            )}
          </div>
          {/* <InputNumberCustom /> */}
        </div>
      </div>
      <div className="flex items-center justify-between bg-white dark:bg-black w-full p-4">
        shop
      </div>
      <div className="flex items-center justify-between bg-white dark:bg-black w-full p-4">
        shop
      </div>
    </div>
  );
};

export default ProductDetails;
