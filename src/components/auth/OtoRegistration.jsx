import React, { useEffect, useState } from "react";
import { Button, Typography, Input, Space, notification } from "antd";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Flex } from "antd";
import { verifyOtp } from "@/redux/features/user/userAsyncActions";
import { toast, Toaster } from "sonner";
import { useDispatch } from "react-redux";

const { Title } = Typography;

const OtoRegistration = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    if (canResend) {
      setTimer(30);
      setCanResend(false);
      toast.success("A new OTP has been sent to your email.");
    }
  };

  const handleOtpChange = (e) => setOtp(e.target.value);

  const handleSubmitOtp = async () => {
    const email = Cookies.get("emailForOtp");

    if (!otp) {
      notification.warning({ message: "Please enter the OTP." });
      return;
    }

    if (!email) {
      notification.error({
        message: "Email not found. Please register again.",
      });
      return;
    }

    try {
      const result = await dispatch(verifyOtp({ email, otp }));
      console.log("OTP verification result:", result);

      if (verifyOtp.fulfilled.match(result)) {
        const { token } = result.payload;
        Cookies.set(process.env.NEXT_PUBLIC_ECOMM_USER, token);
        notification.success({ message: "OTP verified successfully!" });

        setTimeout(() => router.push("/profile"), 1000);
      } else {
        notification.error({
          message: "OTP verification failed. Please try again.",
        });
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      notification.error({
        message: "An error occurred during OTP verification.",
      });
    }
  };

  return (
    <div
      style={{
        padding: "60px",
        textAlign: "center",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: "50px auto",
        width: "fit-content",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ fontWeight: "600" }}>Email Verification</h1>
      <p>
        Verification code has been sent to your email. Please wait a few
        minutes.
      </p>
      <Button
        style={{
          padding: "20px",
          color: "#218f3b",
          border: "none",
          backgroundColor: "transparent",
          borderRadius: "2px",
        }}
        disabled={timer > 0} // Disable the button while the timer is active
        onClick={handleResendCode}
      >
        Resend code {timer > 0 ? `(${timer})` : ""}
      </Button>

      <Flex direction="vertical" gap={10}>
        <Input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          maxLength={6}
          placeholder="Enter your OTP"
          aria-label="OTP input"
          style={{ width: "450px", margin: "0 auto" }}
        />
      </Flex>
      <div>
        <Button
          onClick={handleSubmitOtp}
          style={{
            width: "450px",
            margin: "0 auto",
            marginTop: "15px",
            color: "gray",
            borderColor: "gray",
            color: "gray",
            borderRadius: "2px",
          }}
        >
          Verify
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default OtoRegistration;
