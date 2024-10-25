// import { Form, Input } from "antd";
// import React from "react";

// const LoginPage = () => {
//   return (
//     <div className="user_login_container">
//       <h1 style={{ textAlign: "center", fontSize: "20px", fontWeight: "600" }}>
//         Sign In/Register
//       </h1>
//       <div className="mb-3">
//         <Form
//           name="control-hooks"
//           className="login-form"
//           onFinish={onFinish}
//           style={{
//             maxWidth: 600,
//           }}
//         >
//           <Form.Item
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: "Email is required",
//               },
//             ]}
//           >
//             <Input
//               placeholder="Enter your email"
//               prefix={<MdEmail />}
//               allowClear
//             />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: "Password is required",
//               },
//             ]}
//           >
//             <Input.Password
//               placeholder="Enter your password"
//               prefix={<CiLock />}
//             />
//           </Form.Item>
//           <Form.Item style={{ marginBottom: "3px" }}>
//             <div className="d-flex justify-content-center">
//               <Button type="primary" htmlType="submit" className="primary_btn">
//                 {/* {loading ? <Spin size="small" /> : "Login"}   */}
//                 Login
//               </Button>
//             </div>
//           </Form.Item>
//           <Form.Item>
//             <Divider style={{ margin: "12px 0" }}>OR</Divider>

//             <div className="d-flex justify-content-center">
//               <Button
//                 type="default"
//                 icon={<GoogleOutlined style={{ color: "#90EE90" }} />}
//                 onClick={handleGoogleLogin}
//                 className="google_btn"
//                 style={{
//                   backgroundColor: "#2E8B57",
//                   color: "white",
//                   marginBottom: "12px",
//                 }}
//               >
//                 Sign in with Google
//               </Button>
//             </div>

//             <div className="extra-options mt-8" style={{ textAlign: "center" }}>
//               <Typography.Text>
//                 Don't have an account?{" "}
//                 <Typography.Link href="/register">Register now</Typography.Link>
//               </Typography.Text>
//               <br />
//               <Typography.Text>
//                 Forgot your password?{" "}
//                 <Typography.Link href="/resetpassword">
//                   Reset now
//                 </Typography.Link>
//               </Typography.Text>
//             </div>
//           </Form.Item>
//         </Form>
//       </div>
//       <Toaster richColors position="top-center" />
//     </div>
//   );
// };

// export default LoginPage;
import React from "react";

const LoginPage = () => {
  return <div></div>;
};

export default LoginPage;
