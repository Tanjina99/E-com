import { completePasswordReset } from "../auth/authAsyncActions";
import {
  verifyUser,
  registerUser,
  verifyOtp,
  // otpRequest,
} from "./userAsyncActions";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.userInfo = null;
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    // Handle verification
    builder
      .addCase(verifyUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.userInfo = action?.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "User is verified";
      })
      .addCase(verifyUser.rejected, (state) => {
        state.userInfo = null;
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = "User not verified";
      })
      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true; // Set loading to true when registration starts
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userInfo = action?.payload; // Assuming the registration returns user info
        state.isLoading = false; // Stop loading after success
        state.isSuccess = true; // Registration was successful
        state.message = "User registered successfully"; // Success message
      })
      .addCase(registerUser.rejected, (state) => {
        state.userInfo = null; // Reset user info on error
        state.isLoading = false; // Stop loading
        state.isSuccess = false; // Registration failed
        state.isError = true; // Set error flag
        state.message = "User registration failed"; // Error message
      })
      // Handle OTP verification
      .addCase(verifyOtp.pending, (state) => {
        state.isLoading = true; // Set loading to true during OTP verification
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.userInfo = action?.payload; // Assuming the OTP verification returns user info
        state.isLoading = false; // Stop loading after success
        state.isSuccess = true; // OTP verification was successful
        state.message = "OTP verified successfully"; // Success message
      })
      .addCase(verifyOtp.rejected, (state) => {
        state.userInfo = null; // Reset user info on error
        state.isLoading = false; // Stop loading
        state.isSuccess = false; // OTP verification failed
        state.isError = true; // Set error flag
        state.message = "OTP verification failed"; // Error message
      });
    ////email to request otp
    // .addCase(otpRequest.pending, (state) => {
    //   state.isLoading = true; // Set loading to true during OTP verification
    //   state.message = ""; // Clear message
    // })
    // .addCase(otpRequest.fulfilled, (state, action) => {
    //   state.userInfo = action?.payload; // Assuming the OTP verification returns user info
    //   state.isLoading = false; // Stop loading after success
    //   state.isSuccess = true; // OTP verification was successful
    //   state.message = "OTP verified successfully"; // Success message
    // })
    // .addCase(otpRequest.rejected, (state, action) => {
    //   state.userInfo = null; // Reset user info on error
    //   state.isLoading = false; // Stop loading
    //   state.isSuccess = false; // OTP verification failed
    //   state.isError = true; // Set error flag
    //   state.message = action.payload || "OTP verification failed"; // Use error message from action if available
    // })
    ///using otp, password
    // .addCase(completePasswordReset.pending, (state) => {
    //   state.isLoading = true; // Set loading to true during OTP request
    //   state.message = ""; // Clear message
    // })
    // .addCase(completePasswordReset.fulfilled, (state, action) => {
    //   state.isLoading = false; // Stop loading after success
    //   state.isSuccess = true; // OTP request was successful
    //   state.message = "OTP sent successfully."; // Success message
    // })
    // .addCase(completePasswordReset.rejected, (state, action) => {
    //   state.isLoading = false; // Stop loading
    //   state.isSuccess = false; // OTP request failed
    //   state.isError = true; // Set error flag
    //   state.message = action.payload || "OTP request failed."; // Use error message from action if available
    // });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
