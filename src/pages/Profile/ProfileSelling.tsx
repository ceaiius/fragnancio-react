import { Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileSelling = () => (
  <div className='flex flex-col items-center shadow-[0_0_10px_1px_#D7D7D7] p-6 max-w-[500px] text-center mx-auto my-6 '>
    <Shirt/>
    <p className='text-sm text-gray-faded mt-4'>Start selling today and turn your fragnances into cash</p>
    <Link to="/create" className='bg-black-default text-white px-4 py-1 mt-6 rounded-xs font-bold hidden md:block cursor-pointer'>Start selling</Link>
  </div>
);

export default ProfileSelling; 