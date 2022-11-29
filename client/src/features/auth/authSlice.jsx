import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//! imp API
import authAPI from '../../API/authAPI';

export const login = createAsyncThunk(
  'auth/login',
  async ({ formData, navigate, toast }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await authAPI.postSignIn(formData, config);

      toast.success('Login Successfully!');

      navigate('/');

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const register = createAsyncThunk(
  'auth/resgiter',
  async ({ formData, navigate, toast }, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await authAPI.postSignUp(formData, config);

      toast.success('Register Successfully!');

      navigate('/');

      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setLogout: (state, action) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setLogout } = authSlice.actions;
const reducer = authSlice.reducer;

export default reducer;
