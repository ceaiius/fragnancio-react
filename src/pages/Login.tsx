import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, fetchUser } from '@/features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type LoginFormData } from '@/types/auth';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, error, loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    await dispatch(login(data));
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUser());
      navigate('/');
    }
  }, [token, dispatch, navigate]);

  return (
    <div className="flex h-screen font-mono">
      {/* Left Image Section */}
      <div className="w-1/2 bg-cover bg-center hidden md:block" style={{ backgroundImage: 'url(/login-banner.jpg)' }}></div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex justify-center p-8 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-black-default text-center">Log in</h2>

          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
            />
            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-default text-white px-4 py-2 rounded w-full font-semibold"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
