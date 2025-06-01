import { type Product } from '@/types/product';
import React from 'react';
const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col">
      <img
        src='https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg?wp=1&w=357&h=357'
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
