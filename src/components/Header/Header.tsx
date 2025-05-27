import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import searchIcon from '@/assets/search.svg';
import inboxIcon from '@/assets/inbox.svg';
import heartIcon from '@/assets/heart.svg';
import bagIcon from '@/assets/bag.svg';
import burgerIcon from '@/assets/burger.svg';
import Navbar from './Navbar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login', {replace: true});
  }
  const isAuthenticated = !!token;
  
  return (
    <>
      <header className='sticky top-0 bg-white w-full z-40'>
        <div className="flex justify-between items-center h-16 px-8">
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

          <div className="relative hidden md:flex w-[34vw] lg:w-[42vw] max-w-[704px]">
            <img src={searchIcon} className="absolute left-6 w-5 h-full" alt="search" />
            <input
              type="text"
              placeholder="Search"
              className="h-10 rounded-3xl bg-black-button text-ellipsis border-2 border-black-default w-full px-12"
            />
          </div>

          <nav>
            <ul className="flex gap-4 items-center">
                  <li className='md:hidden'>
                        <img src={searchIcon} className="w-7 h-7" alt='search icon' />
                  </li>
                  <li>
                    <Link to="/wishlist">
                      <img src={heartIcon} className='w-7 h-7' alt='heart icon' />
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">
                      <img src={bagIcon} className='w-7 h-7' alt='bag icon' />
                    </Link>
                  </li>
              {isAuthenticated ? (
                <>
                  <li>
                    <button className="bg-black-default text-white px-4 py-1 rounded-xs font-bold hidden md:block">
                      Sell now
                    </button>
                  </li>
                  
                  <li>
                    <Link to="/inbox">
                      <img src={inboxIcon} className='w-7 h-7' alt='inbox icon' />
                    </Link>
                  </li>
                  
                  <li className='hidden md:block'>
                    <Link to="/profile">Profile</Link>
                  </li>

                  <li className="hidden md:block">
                    <button onClick={handleLogout} className="text-red-600 font-medium" disabled={loading}>
                      {loading ? 'Logging out...' : 'Logout'}
                    </button>
                  </li>

                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="text-black font-medium">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">
                      <button className="bg-black-default text-white px-4 py-1 rounded-xs font-bold">
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
          <button onClick={() => setMenuOpen(false)} className="text-2xl font-bold">&times;</button>
        </div>
        <Navbar isMobile />
      </div>
    </>
  );
};

export default Header;
