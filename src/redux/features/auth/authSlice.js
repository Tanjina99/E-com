import { createSlice } from "@reduxjs/toolkit";
import {
  // completePasswordReset,
  // otpRequest,
  doLogin,
  doSignup,
} from "./authAsyncActions";

const initialState = {
  isAuthenticated: false,
  user: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isAuthenticated = false;
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.user = null;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login cases
    builder
      .addCase(doLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.isSuccess = true;
        state.message = "User Logged in successfully!";
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(doLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isSuccess = false;
        state.message = "User Logged in failed!";
        state.isError = true;
      })
      // Signup cases
      .addCase(doSignup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(doSignup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOtpSend = action.payload.isOtpSend || false;
        if (action.payload.token) {
          state.isAuthenticated = true;
          state.token = action.payload.token; // Store token if available
          state.user = action.payload.user; // Store user info if available
          state.message = "User registered successfully!";
          state.isSuccess = true;
        } else if (state.isOtpSend) {
          state.message = `OTP sent to ${action.payload.email}`;
        } else {
          state.message =
            "User registered successfully, but no token returned.";
        }
      })
      .addCase(doSignup.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.isSuccess = false;
        state.message = "User Registration failed!";
        state.isError = true;
      });
    //email to request otp
    // .addCase(otpRequest.pending, (state) => {
    //   state.isLoading = true;
    //   state.isError = null;
    // })
    // .addCase(otpRequest.fulfilled, (state) => {
    //   state.isLoading = false;
    // })
    // .addCase(otpRequest.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.payload;
    // })
    //using otp, password
    // .addCase(completePasswordReset.pending, (state) => {
    //   state.isLoading = true;
    //   state.isError = null;
    // })
    // .addCase(completePasswordReset.fulfilled, (state) => {
    //   state.isLoading = false;
    // })
    // .addCase(completePasswordReset.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = action.payload;
    // });
  },
});

export const { reset, setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
