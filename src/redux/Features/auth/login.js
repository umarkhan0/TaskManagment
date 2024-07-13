import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../APIService/index";

export const login = createAsyncThunk("login", async (credentials) => {
    try {
        const response = await apiService.post('v1/login', credentials);
        return response.data; 
    } catch (error) {
      throw error.response.data;
    }
});

const loginSlice = createSlice({
    name: "login",
    initialState: {
        isLoading: false,
        success: null,
        error: null,
    },
    reducers: {
        resetLoginState: (state) => {
            state.isLoading = false;
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = false; 
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                // localStorage.setItem("Sign" , action.payload.success)
                state.success = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});
export const { resetLoginState } = loginSlice.actions;

export default loginSlice.reducer;
