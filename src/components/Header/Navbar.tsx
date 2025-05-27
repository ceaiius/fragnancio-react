import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import { User, LogOut } from 'lucide-react'; // Lucide icons (or use custom SVGs)

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
        {/* Category links */}
        {['Men', 'Women', 'Brands', 'Notes'].map((item) => (
          <li key={item} className="py-3 px-4 border-b  border-black-button">
            <a href="#" className="block">{item}</a>
          </li>
        ))}
      </ul>

        {/* Divider before profile/logout */}
        {isMobile && token && (
          <>

          <ul className='border-t border-black-default'>
            <li className="flex items-center gap-3 py-8 px-4">
              <div className='flex flex-row-reverse justify-between items-center gap-3 w-full'>
                <User className="w-5 h-5" />
                <div>
                  
                </div>
                <Link to="/profile" className="block">Your Profile</Link>
              </div>
            </li>

            <li className="flex items-center gap-3 px-4">
              <LogOut className="w-5 h-5 text-red-500" />
              <button
                onClick={handleLogout}
                disabled={loading}
                className="text-red-default font-medium"
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
