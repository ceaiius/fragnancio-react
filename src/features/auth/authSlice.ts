import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const token = localStorage.getItem('token');

interface User {
  id: number;
  name: string;
  email: string;
}

type AuthState = {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  string, // Return type (token)
  { email: string; password: string }, // Argument type
  { rejectValue: string }
>(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      return response.data.token;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return thunkAPI.rejectWithValue(error.response.data?.error || 'Login failed');
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
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

export default authSlice.reducer;