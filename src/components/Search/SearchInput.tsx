import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import searchIcon from '@/assets/search.svg';

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleSearch = useCallback(() => {
    if (debouncedSearchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(debouncedSearchTerm.trim())}`);
    }
  }, [debouncedSearchTerm, navigate]);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearchTerm, handleSearch]);

  return (
    <div className="relative hidden md:flex w-[34vw] lg:w-[42vw] max-w-[704px] cursor-pointer">
      <img src={searchIcon} className="absolute left-6 w-5 h-full" alt="search" />

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search products..."
        className="h-10 rounded-3xl bg-black-button text-ellipsis border-2 border-black-default w-full px-12"
      />
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >

      </button>
    </div>
  );
};

export default SearchInput; 