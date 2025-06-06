import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/features/auth/authSlice';
import { ChevronDown } from 'lucide-react';
import Avatar from '../Avatar/Avatar';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex items-center gap-2 px-2 py-1 rounded-full transition cursor-pointer"
      >
        <div className='w-8 h-8 rounded-full'>
            <Avatar size='sm'/>
        </div>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border z-50">
          <ul className="py-1 text-sm text-gray-700">
            <li>
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
            </li>
            <li>
              <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
