import { type Product } from '@/types/product';
import React from 'react';
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col">
      <img
        src='https://pngmax.com/_next/image?url=https%3A%2F%2Fpng-max.s3.ap-south-1.amazonaws.com%2Flow%2F936505e8-677a-4a6a-af4e-e4a8c0f31dc9.png&w=1200&q=75'
        alt={product.title}
        className="w-full h-50 object-cover rounded-xl"
      />
      <div className="mt-2 text-sm">
        {product.sale_price && (
          <div className='flex items-center gap-2'>
            <p className='line-through text-gray-500'>${product.price}</p>
            <p className='font-bold'>${product.sale_price}</p>
          </div>
        )}
        {!product.sale_price && (
          <p className='font-bold'>${product.price}</p>
        )}
        <p className='font-normal'>{product.brand}</p>
      </div>
      
    </div>
  );
};

export default React.memo(ProductCard)
