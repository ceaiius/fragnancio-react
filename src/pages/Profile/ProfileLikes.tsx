import { Heart } from "lucide-react";

const ProfileLikes = () => (
  <div className='flex flex-col items-center shadow-[0_0_10px_1px_#D7D7D7] p-6 max-w-[500px] text-center mx-auto my-6 '>
    <Heart/>
    <p className='text-sm text-gray-faded mt-4'>You haven't liked any products yet.</p>
    <button className='bg-white text-black-default border border-black-default px-4 py-1 mt-6 rounded-xs font-bold hidden md:block cursor-pointer'>Search Fraggo</button>
  </div>
);

export default ProfileLikes; 