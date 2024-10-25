import React from "react";
import { Button, Form, Input, message } from "antd";
// import { otpRequest } from "@/redux/features/auth/authAsyncActions";
// import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axiosInstance from "@/lib/axios";

const RequestOtp = () => {
  // const dispatch = useDispatch();
  const router = useRouter();
  // const handleSubmit = async (values) => {
  //   try {
  //     const actionResult = await dispatch(otpRequest({ email: values.email }));

  //     if (
  //       otpRequest.fulfilled.match(actionResult) &&
  //       actionResult.payload.isOtpSend
  //     ) {
  //       message.success("OTP sent to your email.");
  //       router.push("/second-otp-page");
  //     } else {
  //       message.error("Failed to send OTP.");
  //     }
  //   } catch (error) {
  //     console.error("OTP Request Error:", error.message);
  //     message.error(error.message);
  //   }
  // };

  const handleSubmit = async (values) => {
    try {
      const response = await axiosInstance.post("/user/forgotPassword", {
        email: values.email,
      });
      console.log(response.data);
      if (response.data.isOtpSend) {
        message.success("OTP sent to your email");
        localStorage.setItem("temp-email", values?.email);
        router.push("/second-otp-page");
      } else {
        message.error("Failed to send otp");
      }
    } catch (error) {
      console.log("OTP Request Error:", error);
      message.error(
        error.response?.data?.message ||
          "Something went wrong, please try again"
      );
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "15px",
        borderRadius: "4px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginLeft: "30px",
          marginBottom: "10px",
          fontSize: "30px",
        }}
      >
        Enter your email to get OTP
      </h1>
      <Form
        onFinish={handleSubmit}
        style={{
          maxWidth: 600,
          width: "100%",
          margin: 0,
          padding: 0,
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
          style={{ marginBottom: "8px" }}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            htmlType="submit"
            className="primary_btn"
            style={{
              width: "100px",
              margin: "15px auto 0",
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

export default RequestOtp;
