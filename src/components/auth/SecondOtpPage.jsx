import React, { useState } from "react";
import { Button, Form, Input, message } from "antd";
// import { useAppDispatch } from "@/redux/hooks";
// import { completePasswordReset } from "@/redux/features/auth/authAsyncActions";
// import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

const SecondOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  // const loading = useSelector((state) => state.auth.isLoading);

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      message.error("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.patch("/user/resetPassword", {
        email: localStorage.getItem("temp-email"),
        otp,
        password: newPassword,
      });
      console.log(response.data);
      message.success("Password reset successfully!");
    } catch (error) {
      console.error(error.response?.data || error.message);
      message.error(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "40px",
        backgroundColor: "white",
        border: "1px solid #d9d9d9",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
          marginLeft: "30px",
        }}
      >
        Reset Password
      </h1>
      <Form
        onFinish={handleReset}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 18 }}
        labelAlign="left"
        style={{ width: "100%" }}
      >
        {/* <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          style={{ marginBottom: "20px" }}
        >
          <Input placeholder="Enter your email" />
        </Form.Item> */}

        <Form.Item
          label="OTP"
          name="otp"
          rules={[{ required: true, message: "Please input your OTP!" }]}
          style={{ marginBottom: "20px" }}
        >
          <Input
            placeholder="Enter your 6 digits OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
          style={{ marginBottom: "20px" }}
        >
          <Input.Password
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please confirm your password!" }]}
          style={{ marginBottom: "20px" }}
        >
          <Input.Password
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            htmlType="submit"
            className="primary_btn"
            style={{
              width: "100px",
              margin: "0 auto",
              display: "block",
              marginTop: "15px",
              borderRadius: "2px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SecondOtpPage;
