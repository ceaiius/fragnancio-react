import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';

export const useUserAcronym = () => {
  const { user } = useAppSelector((state) => state.auth);

  const acronym = useMemo(() => {
    if (!user?.username) return '';

    const words = user.username.split(' ');
    
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }
    
    return words
      .slice(0, 2)
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }, [user?.username]);

  return acronym;
}; 