import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../APIService/index"

export const login = createAsyncThunk(
  "login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await apiService.post('v1/login', credentials);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoading: false,
    success: null,
    error: null,
    loginData: null,
  },
  reducers: {
    resetLoginState: (state) => {
      state.isLoading = false;
      state.success = null;
      state.error = null;
      state.loginData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.loginData = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;
