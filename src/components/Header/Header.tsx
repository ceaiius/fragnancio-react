import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import searchIcon from '@/assets/search.svg';
import inboxIcon from '@/assets/inbox.svg';
import heartIcon from '@/assets/heart.svg';
import bagIcon from '@/assets/bag.svg';
import burgerIcon from '@/assets/burger.svg';
import Navbar from './Navbar';
import UserMenu from './UserMenu';
import { X } from 'lucide-react';
import SearchInput from './Search/SearchInput';
import SearchModal from './Search/SearchModal';
import SearchContent from './Search/SearchContent';
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useAppSelector((state) => state.auth);
  const [searchOpen, setSearchOpen] = useState(false);

  const isAuthenticated = !!token;
  
  return (
    <>
      <header className='sticky top-0 bg-white w-full z-40'>
        <div className="flex justify-between items-center h-16 px-4 sm:px-4 md:px-8 min-w-0 flex-wrap">
          <div className='md:hidden'>
            <img
              src={burgerIcon}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer w-6 h-6"
              alt="menu"
            />
          </div>

          <div className='flex-shrink min-w-0'>
            <Link to="/">
              <h1 className="text-2xl font-bold text-red-default">Frag</h1>
            </Link>
          </div>

          <div className="hidden md:block">
            <SearchInput/>
          </div>

          <nav>
            <ul className="flex gap-4 items-center">
                  <li className='block md:hidden order-1 cursor-pointer'>
                        <img src={searchIcon} className="w-7 h-7" alt='search icon' onClick={() => setSearchOpen(true)}/>
                  </li>
                  <li className='order-3 hidden md:block'>
                    <Link to="/wishlist">
                      <img src={heartIcon} className='w-7 h-7' alt='heart icon' />
                    </Link>
                  </li>
                  <li className='order-4'>
                    <Link to="/cart">
                      <img src={bagIcon} className='w-7 h-7' alt='bag icon' />
                    </Link>
                  </li>
              {isAuthenticated ? (
                <>
                  <li className='md:order-1'>
                    <button className="bg-black-default text-white px-4 py-1 rounded-xs font-bold hidden md:block cursor-pointer">
                      Sell now
                    </button>
                  </li>
                  
                  <li className='order-2'>
                    <Link to="/inbox">
                      <img src={inboxIcon} className='w-7 h-7' alt='inbox icon' />
                    </Link>
                  </li>
                  
                  <li className='hidden md:block order-6'>
                    <UserMenu/>
                  </li>

                  

                </>
              ) : (
                <>
                  <li className='order-5 hidden sm:block'>
                    <Link to="/login" className="text-black font-medium">Login</Link>
                  </li>
                  <li className='order-6'>
                    <Link to="/signup">
                      <button className="bg-black-default text-white px-4 py-1 rounded-xs font-bold cursor-pointer">
                        Sign up
                      </button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
        <hr className='bg-gray-default border-0 h-px' />
        <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)}>
          <SearchContent onClose={() => setSearchOpen(false)}/>
        </SearchModal>
        <div className='hidden md:block'>
          <Navbar />
        </div>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-[70%] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-red-default">Frag</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl font-bold cursor-pointer"><X/></button>
        </div>
        <Navbar isMobile />
      </div>
    </>
  );
};

export default Header;
