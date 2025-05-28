const ProductSkeleton = () => {
    return (
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-full h-48 bg-gray-300 rounded-xl" />
        <div className="mt-2 w-1/2 h-4 bg-gray-300 rounded" />
        <div className="mt-1 w-1/3 h-4 bg-gray-200 rounded" />
      </div>
    );
  };
  
  export default ProductSkeleton;
  