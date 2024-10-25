import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Async thunk for login
export const doLogin = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      console.log("Login error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// Async thunk for signup
export const doSignup = createAsyncThunk(
  "auth/signup",
  async (userData, thunkAPI) => {
    try {
      const response = await authService.signup(userData);

      if (response.isOtpSend) {
        return { isOtpSend: true, email: response.email };
      }

      return { isOtpSend: false, ...response };
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong during signup!";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

//Async thunk for resetPassword
// Request OTP
// export const otpRequest = createAsyncThunk(
//   "auth/otpRequest",
//   async ({ email }, thunkAPI) => {
//     try {
//       const response = await authService.otpRequest(email);

//       if (response?.isOtpSend) {
//         return response;
//       } else {
//         const errorMessage = response?.error || "Failed to send OTP.";
//         return thunkAPI.rejectWithValue(errorMessage);
//       }
//     } catch (error) {
//       console.error("OTP Request Error:", error);
//       const message =
//         error.response?.data?.message || "Network error. Try again.";
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Complete Password Reset
// export const completePasswordReset = createAsyncThunk(
//   "auth/completePasswordReset",
//   async ({ email, otp, password }, thunkAPI) => {
//     try {
//       const response = await authService.completePasswordReset({
//         email,
//         otp,
//         password,
//       });
//       return response.data;
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message || "Password reset failed.";
//       return thunkAPI.rejectWithValue(errorMessage);
//     }
//   }
// );
