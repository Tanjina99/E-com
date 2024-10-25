import axiosInstance from "@/lib/axios";

// Function to verify user
const verifyUser = async () => {
  const response = await axiosInstance.post("/user/verify");
  return response?.data;
};

// Function to register user
const registerUser = async (userData) => {
  const response = await axiosInstance.post("/user/signup", userData);
  return response?.data;
};

// Function to verify OTP
const verifyOtp = async (otpData) => {
  const response = await axiosInstance.post("/user/verifyotp", otpData);
  return response?.data;
};

// // Request OTP for email for reseting password
// const otpRequest = async (email) => {
//   try {
//     const response = await axiosInstance.patch("/user/forgotPassword", {
//       email,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Request OTP error:", error);
//     throw error;
//   }
// };

// Complete password reset
// const completePasswordReset = async ({ email, otp, password }) => {
//   try {
//     const response = await axiosInstance.patch("/user/resetPassword", {
//       email,
//       otp,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Complete password reset error:", error);
//     throw error;
//   }
// };

const userService = {
  verifyUser,
  registerUser,
  verifyOtp,
  // otpRequest,
  // completePasswordReset,
};

export default userService;
