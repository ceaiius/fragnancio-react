import SettingsSidebar from '@/components/Settings/SettingsSidebar';
import TextInput from '@/components/Form/TextInput';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setUser } from '@/features/auth/authSlice';
import { useState, useEffect } from 'react';
import * as z from 'zod';
import { updateUser } from '@/services/userService';

const baseSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  current_password: z.string().min(1, 'Current password is required'),
});

const schema = baseSchema.refine(
  (data) => !data.password || data.password.length >= 6,
  {
    message: 'Password must be at least 6 characters',
    path: ['password'],
  }
);

type FormData = z.infer<typeof schema>;

const Settings = () => {
  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormData>({
    username: user?.username || '',
    email: user?.email || '',
    password: '',
    current_password: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  // Update form fields when user data arrives
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        username: user.username || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  // Use baseSchema for single field validation
  const validate = (field: keyof FormData, value: string) => {
    try {
      baseSchema.shape[field].parse(value);
      setErrors((prev) => ({ ...prev, [field]: '' }));
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors((prev) => ({ ...prev, [field]: err.errors[0].message }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    validate(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setApiError('');
    setLoading(true);
    setErrors({});
    // Validate all fields
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }
    try {
      if (!token) throw new Error('Not authenticated');
      await updateUser(
        {
          username: form.username,
          email: form.email,
          password: form.password && form.password.length > 0 ? form.password : undefined,
          current_password: form.current_password,
        },
        token
      );
      // Instantly update Redux and localStorage with new user data
      if (user) {
        dispatch(setUser({
          ...user,
          username: form.username,
          email: form.email,
        }));
      }
      setSuccess(true);
      setForm((prev) => ({ ...prev, password: '', current_password: '' }));
    } catch (err: any) {
      setApiError(err?.response?.data?.error || err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    !Object.values(errors).some(Boolean) &&
    form.username.length >= 3 &&
    form.email.length > 0 &&
    form.current_password.length > 0 &&
    (form.password === undefined || form.password.length === 0 || form.password.length >= 6);

  return (
    <main className='flex flex-1 flex-col font-mono'>
      <div className="flex max-w-5xl gap-12 pb-20 pt-8">
        <SettingsSidebar />
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-6">User details</h2>
          <form onSubmit={handleSubmit} className="max-w-md">
            <TextInput
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              error={errors.username || ''}
            />
            <TextInput
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email || ''}
            />
            <TextInput
              label="New password (optional)"
              name="password"
              type="password"
              value={form.password || ''}
              onChange={handleChange}
              error={errors.password || ''}
              placeholder="Enter new password (leave blank to keep current)"
            />
            <TextInput
              label="Current password (required to save changes)"
              name="current_password"
              type="password"
              value={form.current_password || ''}
              onChange={handleChange}
              error={errors.current_password || ''}
              placeholder="Enter your current password"
            />
            {apiError && <p className="text-red-600 mb-2">{apiError}</p>}
            <button
              type="submit"
              disabled={loading || !isFormValid}
              className="mt-4 bg-black text-white px-6 py-2 rounded font-semibold hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save changes'}
            </button>
            {success && <p className="text-green-600 mt-3">Profile updated successfully!</p>}
          </form>
        </section>
      </div>
    </main>
  );
};

export default Settings;