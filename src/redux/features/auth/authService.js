import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

// Login function
const login = async (userData) => {
  try {
    const response = await axiosInstance.post("/user/signin", userData);

    if (response.data.token) {
      Cookies.set("authToken", response.data.token); // Store the token in cookies
    }

    return response.data;
  } catch (error) {
    console.error(
      "Login service error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Signup function
const signup = async (userData) => {
  try {
    const response = await axiosInstance.post("/user/signup", userData);

    if (response.data.isOtpSend) {
      console.log("OTP sent to:", response.data.email);
    }

    return response.data;
  } catch (error) {
    console.error(
      "Signup service error:",
      error.response?.data?.message || error.message
    );
    throw error.response?.data || error.message;
  }
};

// Request to send the OTP to the user's email
// export const otpRequest = async (email) => {
//   try {
//     const response = await axiosInstance.post("/user/forgotPassword", {
//       email,
//     });

//     if (response.status === 200 && response.data?.isOtpSend) {
//       console.log("OTP Request Success:", response.data);
//       return response.data; // Successful response
//     } else {
//       throw new Error("OTP request failed. Please try again.");
//     }
//   } catch (error) {
//     console.error(
//       "Request OTP Error:",
//       error.response?.data?.message || error.message
//     );
//     throw error.response?.data || new Error("Network or server error.");
//   }
// };

// Reset Password using OTP
// export const completePasswordReset = async ({ email, otp, password }) => {
//   try {
//     const response = await axiosInstance.patch("/user/resetPassword", {
//       email,
//       otp,
//       password, // Ensure this matches backend expectations
//     });
//     return response.data;
//   } catch (error) {
//     console.error(
//       "Complete password reset error:",
//       error.response?.data?.message || error.message
//     );
//     throw error.response?.data || error.message;
//   }
// };

const authService = {
  login,
  signup,
  // otpRequest,
  // completePasswordReset,
};

export default authService;
