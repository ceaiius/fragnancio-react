import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';
import searchIcon from '@/assets/search.svg';
import { ArrowRight } from 'lucide-react';
import { storePrompts, type searchPrompts } from '@/services/searchService';
import { useAppSelector } from '@/store/hooks';

const MAX_HISTORY = 3;

interface SearchInputMobileProps {
  onClose: () => void;
  trendingPrompts: searchPrompts[];
  isLoading?: boolean;
}

const SearchInputMobile = ({ onClose, trendingPrompts}: SearchInputMobileProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [searchHistory, setSearchHistory] = useState<{ key: string }[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const userId = user ? user.id : null;

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSearchHistory(Array.isArray(parsed) ? parsed : []);
      } catch {
        setSearchHistory([]);
      }
    } else {
      setSearchHistory([]);
    }
  }, []);

  const addToHistory = useCallback((term: string) => {
    const normalizedTerm = term.trim().toLowerCase();
    const filtered = searchHistory.filter(
      (item) => item.key.trim().toLowerCase() !== normalizedTerm
    );
    const newHistory = [{ key: term }, ...filtered].slice(0, MAX_HISTORY);
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
    
  }, [searchHistory]);

  const handleClearSearchHistory = () => {
    localStorage.removeItem('searchHistory');
    setSearchHistory([]);
  };

  const handleSearch = useCallback(async () => {
    const trimmedSearchTerm = debouncedSearchTerm.trim();
    if (trimmedSearchTerm) {
      addToHistory(trimmedSearchTerm);
      try {
        await storePrompts(trimmedSearchTerm, userId ?? 0);
      } catch(error) {
        console.error('Error storing search prompts:', error);
      }
      navigate(`/search?q=${encodeURIComponent(trimmedSearchTerm)}`);
    }
  }, [debouncedSearchTerm, navigate, addToHistory, userId]);

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className="">
      <div className='relative md:flex w-full cursor-pointer'>
        <img 
          src={searchIcon} 
          className="absolute left-4 w-5 h-full" 
          alt="search" 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="h-10 rounded-sm placeholder-black-default bg-white text-ellipsis border border-black-default w-full px-12"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onClose();
            }
          }}
        />
        <ArrowRight className="absolute right-4 top-0 w-5 h-full" onClick={onClose} />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {/* Optionally add a search icon here */}
        </button>
      </div>

      <div className='p-3'>
        {searchHistory.length > 0 && (
          <>
            <div className='flex justify-between items-center'>
              <h2 className='text-xs text-gray-faded'>Recent</h2>
              <button className='text-xs text-blue-default' onClick={handleClearSearchHistory}>Clear</button>
            </div>
            {searchHistory.slice(0, MAX_HISTORY).map((item: { key: string }) => (
              <button
                key={item.key}
                className="block w-full text-left py-1 px-2 mt-2 rounded hover:bg-gray-default cursor-pointer"
                onClick={() => {
                  navigate(`/search?q=${encodeURIComponent(item.key)}`);
                  onClose();
                }}
              >
                {item.key}
              </button>
            ))}
          </>
        )}

        <div className='mt-4'>
          {trendingPrompts.length > 0 && (
            <div className="text-xs text-gray-faded">Trending searches</div>
          )}
          {trendingPrompts.length > 0 && (
            trendingPrompts.map((prompt, idx) => (
                <div
                key={idx}
                className="hover:bg-gray-default cursor-pointer py-1 px-2"
                onClick={() => {
                  if (typeof prompt === 'string') {
                    navigate(`/search?q=${encodeURIComponent(prompt)}`);
                  } else {
                    navigate(`/search?q=${encodeURIComponent(prompt.query)}`);
                  }
                  onClose();
                }}
              >
                {typeof prompt === 'string' ? prompt : prompt.query}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInputMobile;