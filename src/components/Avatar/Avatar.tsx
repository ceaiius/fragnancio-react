import { useUserAcronym } from '@/hooks/useUserAcronym';

interface AvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-24 h-24 text-xl',
};

const Avatar = ({ size = 'md', className = '' }: AvatarProps) => {
  const acronym = useUserAcronym();

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        bg-gray-200 
        flex 
        items-center 
        justify-center 
        font-semibold 
        text-gray-700
        ${className}
      `}
    >
      {acronym}
    </div>
  );
};

export default Avatar; 