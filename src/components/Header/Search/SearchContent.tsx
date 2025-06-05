import { X } from 'lucide-react';
import SearchInputMobile from './SearchInputMobile';
import { type searchPrompts } from '@/services/searchService';

interface SearchContentProps {
  onClose: () => void;
  trendingPrompts: searchPrompts[];
  isLoading?: boolean;
}

const SearchContent = ({ onClose, trendingPrompts, isLoading = false }: SearchContentProps) => {
  return (
    <main className="flex flex-col gap-2 font-mono">
    <div className='fixed w-full h-full top-0 left-0 z-10 bg-white overflow-y-auto flex flex-col gap-4'>
      <div className='flex justify-between p-6 items-center'>
          <h1 className='text-2xl font-bold'>Search</h1>
          {onClose && (
              <button
              className='cursor-pointer text-black-default'
              onClick={onClose}>
              <X/>
              </button>
          )}
      </div>
      <div className='m-4 flex flex-col gap-2' >
        <div className='flex flex-col gap-2'>
            <SearchInputMobile 
              onClose={onClose} 
              trendingPrompts={trendingPrompts} 
              isLoading={isLoading}
            />
        </div>
      </div>
      
    </div>
    
  </main>
  )
}

export default SearchContent