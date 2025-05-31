const FilterDropdownSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div> {/* Label placeholder */}
      <div className="h-10 bg-gray-300 rounded w-full"></div>   {/* Select box placeholder */}
    </div>
  );
};
export default FilterDropdownSkeleton;