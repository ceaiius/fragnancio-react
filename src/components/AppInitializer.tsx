import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUser } from '@/features/auth/authSlice';

const AppInitializer = () => {
  const dispatch = useAppDispatch();
  const { token, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(fetchUser());
    }
  }, [token, user, dispatch]);

  return null;
};

export default AppInitializer; 