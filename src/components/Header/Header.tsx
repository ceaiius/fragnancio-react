import searchIcon from '@/assets/search.svg';
import inboxIcon from '@/assets/inbox.svg';
import heartIcon from '@/assets/heart.svg';
import bagIcon from '@/assets/bag.svg';
import Navbar from './Navbar';
const Header = () => {
    
  return (
    <header className='sticky top-0 bg-white w-full z-4'>
        <div className="flex justify-between items-center h-16 bg-white text-gray-900 relative mx-auto my-0 py-4 px-8 min-h-[65px]">
            <div>
                <a href="#">
                    <h1 className="text-2xl font-bold text-[#E52020]">Fragnancio</h1>
                </a>
            </div>
            <div className="relative flex flex-col z-[calc(0+1)]">
                <form action="" className="relative mx-auto flex w-[calc(42vw)] max-w-[704px]">
                    <img src={searchIcon} alt="search" className="absolute left-6 h-full z-2 w-5" />
                    <div className="relative overflow-hidden flex-1 z-[calc(0+1)]">
                        <input type="text" placeholder="Search"
                         className="h-10 rounded-3xl bg-[#F3F3F3] m-0 text-ellipsis whitespace-nowrap overflow-hidden border-2 border-[#262626] w-full px-12 pb-0 shadow-none appearance-none" />
                    </div>
                </form>
            </div>
                <nav>
                    <ul className="flex gap-4 justify-center items-center">
                        <li>
                            <button className="bg-[#262626] text-white px-4 py-1 rounded-xs font-bold">Sell now</button>
                        </li>
                        <li>
                            <a href="#">
                                <img src={inboxIcon} className='h-8 w-8'/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={heartIcon} className='h-8 w-8'/>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <img src={bagIcon} className='h-8 w-8'/>
                            </a>
                        </li>
                        <li>
                            <a href="#">Profile</a>
                        </li>
                    </ul>
                </nav>
        </div>
        <hr className='bg-[#d7d7d7] border-0 h-px'/>
        <Navbar/>
    </header>
  )
}

export default Header;