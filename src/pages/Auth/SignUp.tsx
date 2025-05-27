// SignUp.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { register as registerUser, resetAuth, type BackendFieldErrors } from '@/features/auth/authSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const registerSchema = z.object({
    username: z.string().min(3, { message: 'Username must be at least 3 characters' }), // Adjusted min for example
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirm_password: z.string().min(6, { message: 'Please confirm your password' }),
})
.superRefine((val, ctx) => {
    if (val.password !== val.confirm_password) {
    ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirm_password'], 
    });
    }
});

type SignUpFormValues = z.infer<typeof registerSchema>;

const SignUp = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { token, error: apiError, loading, isSuccess } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        setError, 
        formState: { errors },
        reset, 
    } = useForm<SignUpFormValues>({ 
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        }
    });

    const onSubmit = async (data: SignUpFormValues) => {
        dispatch(resetAuth()); 
        await dispatch(registerUser(data));
    };

    useEffect(() => {
        if (isSuccess && token) {
            navigate('/'); 
            reset();
        }
    }, [isSuccess, token, dispatch, navigate, reset]);


    useEffect(() => {
        if (apiError) {
            if (typeof apiError === 'object' && apiError !== null && !Array.isArray(apiError)) {
                Object.keys(apiError).forEach((key) => {
                    const fieldName = key as keyof SignUpFormValues;
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
      <div className="w-1/2 bg-cover bg-center hidden md:block" style={{ backgroundImage: 'url(src/assets/test.png)' }}></div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex justify-center  p-8 mx-auto"> 
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6 bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-black-default text-center">Sign up</h2>

          {typeof apiError === 'string' && (
            <p className="text-sm text-red-600 bg-red-100 p-3 rounded text-center">{apiError}</p>
          )}

          <div>
            <label htmlFor="username" className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              {...register('username')}
              className={`mt-1 w-full border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.username && <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              {...register('email')}
              className={`mt-1 w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className={`mt-1 w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="confirm_password" className="block font-medium text-gray-700">Confirm Password</label> {/* Changed htmlFor to match register key */}
            <input
              type="password"
              id="confirm_password" 
              {...register('confirm_password')}
              className={`mt-1 w-full border ${errors.confirm_password ? 'border-red-500' : 'border-gray-300'} rounded px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.confirm_password && <p className="text-sm text-red-500 mt-1">{errors.confirm_password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-default hover:bg-gray-700 text-white px-4 py-2 rounded w-full font-semibold transition duration-150 ease-in-out disabled:opacity-50"
          >
            {loading ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;