import { NavLink, Outlet } from 'react-router-dom';
import avatarIcon from '@/assets/avatar.svg'; // use a placeholder profile icon

const Profile = () => {
  return (
    <main className="flex flex-1 flex-col font-mono">
      <div className="w-full max-w-[1280px] mx-auto px-4 py-6">
        <div>
          <div className="flex items-center gap-8 ">
            <div>
              <img src={avatarIcon} alt="profile" className="w-24 h-24 rounded-full" />
            </div>
            <h1 className="text-2xl font-bold">Nika Mamaladze</h1>
          </div>
          <div className='flex flex-col gap-4 mt-6'>
            <div className='flex items-center gap-10'>
              <p className='flex gap-2'><span className='font-bold'>0</span>followers</p>
              <p className='flex gap-2'><span className='font-bold'>0</span>following</p>
            </div>
            <span className='font-bold'>Nika Mamaladzes shop</span>
          </div>
        </div>

        <div className='flex gap-4 border-b border-white-border pb-0 mb-4 mt-4'>
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `px-4 font-bold cursor-pointer ${isActive ? 'border-b-2 border-black' : 'text-gray-faded'}`
            }
          >
            Selling
          </NavLink>
          <NavLink
            to="/profile/likes"
            className={({ isActive }) =>
              `px-4 font-bold cursor-pointer ${isActive ? 'border-b-2 border-black' : 'text-gray-faded'}`
            }
          >
            Likes
          </NavLink>
          <NavLink
            to="/profile/saved"
            className={({ isActive }) =>
              `px-4 font-bold cursor-pointer ${isActive ? 'border-b-2 border-black' : 'text-gray-faded'}`
            }
          >
            Saves
          </NavLink>
        </div>

        <Outlet />
      </div>
    </main>
  );
};

export default Profile;