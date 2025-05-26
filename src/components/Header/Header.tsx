import { useState } from 'react';
import searchIcon from '@/assets/search.svg';
import inboxIcon from '@/assets/inbox.svg';
import heartIcon from '@/assets/heart.svg';
import bagIcon from '@/assets/bag.svg';
import burgerIcon from '@/assets/burger.svg';
import Navbar from './Navbar';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <a href="#">
              <h1 className="text-2xl font-bold text-[#E52020]">Frag</h1>
            </a>
          </div>

          <div className="relative hidden md:flex w-[34vw] lg:w-[42vw] max-w-[704px]">
            <img src={searchIcon} className="absolute left-6 w-5 h-full" alt="search" />
            <input type="text" placeholder="Search"
              className="h-10 rounded-3xl bg-[#F3F3F3] text-ellipsis border-2 border-[#262626] w-full px-12" />
          </div>

          <nav>
            <ul className="flex gap-4 items-center">
              <li>
                <button className="bg-[#262626] text-white px-4 py-1 rounded-xs font-bold hidden md:block">Sell now</button>
              </li>
              <li className='md:hidden'><img src={searchIcon} className="w-7 h-7" /></li>
              <li><a href="#"><img src={inboxIcon} className='w-7 h-7' /></a></li>
              <li><a href="#"><img src={heartIcon} className='w-7 h-7' /></a></li>
              <li><a href="#"><img src={bagIcon} className='w-7 h-7' /></a></li>
              <li className='hidden md:block'><a href="#">Profile</a></li>
            </ul>
          </nav>
        </div>
        <hr className='bg-[#d7d7d7] border-0 h-px' />

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
          <h2 className="text-xl font-bold text-[#E52020]">Frag</h2>
          <button onClick={() => setMenuOpen(false)} className="text-2xl font-bold">&times;</button>
        </div>
        <Navbar isMobile />
      </div>
    </>
  );
};

export default Header;
