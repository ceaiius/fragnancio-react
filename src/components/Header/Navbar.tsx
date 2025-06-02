import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import { User, LogOut, ArrowRight } from 'lucide-react';

interface NavbarProps {
  isMobile?: boolean;
}

const Navbar = ({ isMobile = false }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, loading } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  return (
    <nav className={`${isMobile ? 'm-0 p-0' : 'px-4 py-0 border border-white-border'} font-mono`}>
      <ul className={`list-none ${isMobile ? 'flex flex-col text-lg font-semibold' : 'flex gap-8 font-bold text-lg p-4'}`}>
      {['Men', 'Women', 'Unisex','Sale'].map((item) => (
        <li
          key={item}
          className={`${isMobile && 'py-3 px-4 border-b  border-black-button'} ${item == 'Sale' && 'text-red-default order-1'} flex items-center justify-between`}
        >
          <Link to={`/category/${item.toLowerCase()}`} className="block capitalize">
            {item}
          </Link>
          {isMobile && <ArrowRight className="w-5 h-5 text-black-default" />}
        </li>
      ))}
      <li className={`${isMobile && 'py-3 px-4 border-b  border-black-button'} flex items-center justify-between`}
>
        <Link to="/brands">Brands</Link>
        {isMobile && <ArrowRight className="w-5 h-5 text-black-default" />}

      </li>
      </ul>

        {/* Divider before profile/logout */}
        {isMobile && token && (
          <>
          <ul className='flex flex-col gap-6 border-t border-black-default px-4 py-6 [&>li]:border-black-button [&>li]:border-b [&>li]:pb-3'>
            <li className="flex items-center">
              <div className='flex flex-row-reverse justify-between items-center gap-3 w-full'>
                <User className="w-5 h-5" />
                <div>
                  
                </div>
                <Link to="/profile" className="block">Your Profile</Link>
              </div>
            </li>

            <li>
              <Link to="/products/create">Sell</Link>
            </li>

            <li className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <button
                onClick={handleLogout}
                disabled={loading}
                className="text-red-default font-medium cursor-pointer"
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </li>
          </ul>
            
          </>
        )}
     
    </nav>
  );
};

export default Navbar;
