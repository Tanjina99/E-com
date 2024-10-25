import { Button, Form, Input, Typography } from "antd";
import { MdEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast, Toaster } from "sonner";
import { doSignup } from "@/redux/features/auth/authAsyncActions";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/redux/features/user/userAsyncActions";
import { GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Register = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const onFinish = (data) => {
    console.log("Form submission data:", data);

    // Validate that all required fields are filled
    if (data.password && data.confirmPassword) {
      dispatch(doSignup(data))
        .then((result) => {
          console.log("Signup response payload:", result.payload);

          // Destructure payload and check if the signup was fulfilled
          if (doSignup.fulfilled.match(result)) {
            const { isOtpSend, email } = result.payload;

            if (isOtpSend) {
              toast.success(
                "Registration successful! Please check your email for OTP."
              );

              // Store the email in cookies to pass to the OTP page
              Cookies.set("emailForOtp", email);

              // Redirect to OTP verification page
              router.push("/otp-verification");
            } else {
              toast.error("OTP not sent. Please try again.");
            }
          } else if (doSignup.rejected.match(result)) {
            toast.error("Registration failed: " + result.payload);
          }
        })
        .catch((error) => {
          console.error("Signup error", error);
          toast.error(
            "An error occurred during registration. Please try again."
          );
        });
    } else {
      toast.warning("Please fill in all required fields.");
    }
  };

  return (
    <div
      className="register-container"
      style={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "column",
        marginBottom: "50px",
      }}
    >
      <h1
        style={{ textAlign: "center", marginLeft: "50px", fontWeight: "500" }}
      >
        Register
      </h1>
      <Form
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
          width: "100%",
          margin: "10px auto",
          backgroundColor: "white",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          padding: "40px",
          textWrap: "nowrap",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
          style={{ marginBottom: "20px" }}
        >
          <Input placeholder="Enter your name" allowClear />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email is required" }]}
          style={{ marginBottom: "20px", fontSize: "18px" }}
        >
          <Input
            placeholder="Enter your email"
            prefix={<MdEmail />}
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
          style={{ marginBottom: "20px", fontSize: "18px" }}
        >
          <Input.Password
            placeholder="Enter your password"
            prefix={<CiLock />}
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
          style={{ marginBottom: "20px" }}
        >
          <Input.Password
            placeholder="Confirm your password"
            prefix={<CiLock />}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
          <div className="d-flex justify-content-center">
            <Button
              type="primary"
              htmlType="submit"
              className="primary_btn"
              loading={isLoading}
              style={{ marginBottom: "0px" }}
            >
              Register
            </Button>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
          <div className="d-flex justify-content-center">
            <Button
              type="default"
              icon={<GoogleOutlined style={{ color: "#90EE90" }} />}
              className="google_btn"
              style={{
                backgroundColor: "#2E8B57",
                color: "white",
                marginBottom: "0px",
              }}
            >
              Sign in with Google
            </Button>
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 18 }}>
          <div
            className="extra-options"
            style={{ textAlign: "center", marginBottom: "10px" }}
          >
            <Typography.Text>
              Already have an account?{" "}
              <Typography.Link onClick={() => router.push("/")}>
                Login now
              </Typography.Link>
            </Typography.Text>
          </div>
        </Form.Item>
      </Form>
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default Register;
