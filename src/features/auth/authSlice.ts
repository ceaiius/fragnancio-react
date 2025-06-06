import type { LoginFormData, RegisterFormData } from '@/types/auth';
import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';


interface User {
  id: number;
  username: string;
  email: string;
}

export interface BackendFieldErrors {
  [key: string]: string[]; 
}

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  isSuccess: boolean;
  error: string | BackendFieldErrors | null;
};

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  user: null,
  loading: false,
  isSuccess: false,
  error: null,
};

export const register = createAsyncThunk<string, RegisterFormData, {rejectValue : string | BackendFieldErrors}
>(
  'auth/signup',
  async ({ username, email, password, confirm_password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { username, email, password, confirm_password });
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.errors) { 
        return thunkAPI.rejectWithValue(error.response.data.errors as BackendFieldErrors);
      }
      return thunkAPI.rejectWithValue('Sign up failed');
    }
  }
)

export const login = createAsyncThunk<
  string,
  LoginFormData,
  { rejectValue: string | BackendFieldErrors; }
>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.error) {
        return thunkAPI.rejectWithValue(error.response.data.error as BackendFieldErrors);
      }
      return thunkAPI.rejectWithValue('Login failed');
    }
  }
);

export const fetchUser = createAsyncThunk<
  User,
  void, 
  { state: { auth: AuthState }; rejectValue: string }
>(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data as User;
    } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data?.error || 'Fetching user failed');
      }
      return thunkAPI.rejectWithValue('Failed to fetch user');
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { state: { auth: AuthState } }
>(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      console.log(token);
      
      await axios.post(`${API_URL}/logout`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem('token');
    } catch (error) {

      console.error(error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isSuccess = true;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action : PayloadAction<string | BackendFieldErrors | undefined>) => {
        state.loading = false;
        state.isSuccess = false;
        
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Authorization failed due to an unknown error.';
        }
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<string | BackendFieldErrors | undefined>) => {
        state.loading = false;
        state.isSuccess = false;
        if (action.payload) {
          state.error = action.payload;
        } else {
          state.error = 'Register failed due to an unknown error.';
        }
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user data';
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        state.error = 'Logout failed';
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;