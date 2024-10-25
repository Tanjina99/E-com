import { Button, Form, Input, Spin, Typography, Divider } from "antd";
import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useState } from "react";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";
import { doLogin } from "@/redux/features/auth/authAsyncActions";
import { useRouter } from "next/navigation";
import { verifyUser } from "@/redux/features/user/userAsyncActions";
import { GoogleOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@/redux/hooks";

const Login = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // const onFinish = (data) => {
  //   if (Object.values(data).length > 1) {
  // setLoading(true); // Start loading
  // console.log("loading", loading)
  // axiosInstance
  //   .post("/user/signin", data)
  //   .then((res) => {
  //     if (res.status === 200) {
  //       const token = res?.data?.token;
  //       Cookies.set(process.env.NEXT_PUBLIC_ECOMM_USER, token);
  //       setLoading(false); // Stop loading after success
  //       toast.success("Logged in Successfull!")
  //       setTimeout(() => {
  //         window.location.href = "/"  //once you log in navigate to this "/.." specific page
  //       }, 1000);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  const onFinish = (data) => {
    if (Object.values(data).length > 1) {
      dispatch(doLogin(data))
        .then((result) => {
          if (doLogin.fulfilled.match(result)) {
            const token = result?.payload?.token;
            const username = result?.payload?.user?.username; // Assuming user data includes username
            Cookies.set(process.env.NEXT_PUBLIC_ECOMM_USER, token);
            toast.success("Logged in successfully!");

            // Optionally store username in local state or context
            // e.g., dispatch(storeUsername(username));

            // Load user (verifyUser from userAsyncActions)
            dispatch(verifyUser());

            setTimeout(() => {
              // Navigate with reload
              router.push("/profile");
            }, 1000);
            console.log("Matched result", result);
          } else if (doLogin.rejected.match(result)) {
            toast.error("Login failed");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleGoogleLogin = () => {
    // Handle Google login integration here
    toast.success("Google Login feature coming soon!");
  };

  return (
    <div className="user_login_container">
      <h1 style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
        Sign In/Register
      </h1>
      <div className="mb-3">
        <Form
          name="control-hooks"
          className="login-form"
          onFinish={onFinish}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Email is required",
              },
            ]}
          >
            <Input
              placeholder="Enter your email"
              prefix={<MdEmail />}
              allowClear
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required",
              },
            ]}
          >
            <Input.Password
              placeholder="Enter your password"
              prefix={<CiLock />}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: "3px" }}>
            <div className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit" className="primary_btn">
                {/* {loading ? <Spin size="small" /> : "Login"}   */}
                Login
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Divider style={{ margin: "12px 0" }}>OR</Divider>

            <div className="d-flex justify-content-center">
              <Button
                type="default"
                icon={<GoogleOutlined style={{ color: "#90EE90" }} />}
                onClick={handleGoogleLogin}
                className="google_btn"
                style={{
                  backgroundColor: "#2E8B57",
                  color: "white",
                  marginBottom: "12px",
                }}
              >
                Sign in with Google
              </Button>
            </div>

            <div className="extra-options mt-8" style={{ textAlign: "center" }}>
              <Typography.Text>
                Don't have an account?{" "}
                <Typography.Link href="/register">Register now</Typography.Link>
              </Typography.Text>
              <br />
              <Typography.Text>
                Forgot your password?{" "}
                <Typography.Link href="/resetpassword">
                  Reset now
                </Typography.Link>
              </Typography.Text>
            </div>
          </Form.Item>
        </Form>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default Login;
