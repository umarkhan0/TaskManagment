import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../APIService/index";
import swal from 'sweetalert';

export const signUp = createAsyncThunk("signUp", async (credentials) => {
    try {
        const response = await apiService.post('v1/register', credentials);
        return response.data; 
    } catch (error) {
        throw error.response.data;
    }
});

const signUPSlice = createSlice({
    name: "signUp",
    initialState: {
        isLoading: false,
        success: null,
        error: null,
    },
    reducers: {
        resetSignupState: (state) => {
            state.isLoading = false;
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { resetSignupState } = signUPSlice.actions;

export default signUPSlice.reducer;
