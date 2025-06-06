import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, fetchUser, resetAuth, type BackendFieldErrors } from '@/features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { type LoginFormData } from '@/types/auth';
import { ArrowLeft } from 'lucide-react';


const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, error: apiError, loading, isSuccess } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
      defaultValues: {
        email: '',
        password: '',
      }
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(resetAuth()); 
    await dispatch(login(data));
  };

  useEffect(() => {
    if (isSuccess && token) {
      dispatch(fetchUser());
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isSuccess, token, dispatch, navigate, location]);

  useEffect(() => {
          if (apiError) {
              if (typeof apiError === 'object' && apiError !== null && !Array.isArray(apiError)) {
                  Object.keys(apiError).forEach((key) => {
                      const fieldName = key as keyof LoginFormValues;
                      const messages = (apiError as BackendFieldErrors)[fieldName];
                      if (messages && messages.length > 0) {
                          setError(fieldName, {
                              type: 'server', 
                              message: messages[0],
                          });
                      }
                  });
              } else if (typeof apiError === 'string') {
                  console.error("Generic API Error:", apiError);
              }
          }
      }, [apiError, setError]);
  
      useEffect(() => {
          return () => {
              dispatch(resetAuth());
          };
      }, [dispatch]);

  return (
    <div className="flex h-screen font-mono">
      {/* Left Image Section */}
      <div className="w-1/2 bg-cover bg-center hidden xl:block" style={{ backgroundImage: 'url(src/assets/test.png)' }}></div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex justify-center p-10 mx-auto">
        <div className='absolute top-6 left-8'>
          <ArrowLeft onClick={() => navigate(-1)}/>
        </div>
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

          {typeof apiError === 'string' && (
            <p className="text-sm text-red-600 bg-red-100 p-3 rounded text-center">{apiError}</p>
          )}

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
