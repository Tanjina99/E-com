import { createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";
import { setAuthenticated } from "../auth/authSlice";

// Verify user function
export const verifyUser = createAsyncThunk(
  "user/verify",
  async (_, thunkAPI) => {
    try {
      const response = await userService.verifyUser();
      thunkAPI.dispatch(setAuthenticated(true));
      return response;
    } catch (error) {
      const message =
        (error?.response &&
          error?.response.data &&
          error?.response.data.errors.message) ||
        "Error occurred while fetching the user info";
      thunkAPI.dispatch(setAuthenticated(false));
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Register user function
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await userService.registerUser(userData);

      if (response.token) {
        thunkAPI.dispatch(setAuthenticated(true)); // Set authenticated to true on successful registration
        // Optionally set the token in cookies or store
        // Cookies.set(process.env.NEXT_PUBLIC_ECOMM_USER, response.token);
      }

      return response;
    } catch (error) {
      const message =
        (error?.response &&
          error?.response.data &&
          error?.response.data.errors.message) ||
        "Registration failed. Please try again.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// OTP Verification function
export const verifyOtp = createAsyncThunk(
  "user/verifyOtp",
  async (otpData, thunkAPI) => {
    try {
      const response = await userService.verifyOtp(otpData);
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.message ||
        error?.message ||
        "OTP verification failed.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Request OTP function
export const otpRequest = createAsyncThunk(
  "user/otpRequest",
  async (email, thunkAPI) => {
    try {
      const response = await userService.otpRequest(email);
      return response; // You can return any data you need
    } catch (error) {
      const message =
        error?.response?.data?.errors?.message || "Request OTP failed.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Complete password reset function
export const completePasswordReset = createAsyncThunk(
  "user/completePasswordReset",
  async ({ email, otp, newPassword }, thunkAPI) => {
    try {
      const response = await userService.completePasswordReset({
        email,
        otp,
        password: newPassword,
      });
      return response;
    } catch (error) {
      const message =
        error?.response?.data?.errors?.message || "Password reset failed.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
