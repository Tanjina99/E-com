import React, { useState } from "react";
import { Layout, Menu, Avatar, Typography, Button, Form, Input } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  CustomerServiceOutlined,
} from "@ant-design/icons";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const Profile = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);
  const [isEditable, setIsEditable] = useState(false);
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();

  // const handleLogout = () => {
  //   Cookies.remove(process.env.NEXT_PUBLIC_ECOMM_USER);
  //   router.push("/");
  // };
  console.log(user);

  const handleEdit = () => {
    setIsEditable(true);
  };

  const onFinish = (values) => {
    const updatedUserData = { ...user, ...values, phone };

    Cookies.set(
      process.env.NEXT_PUBLIC_ECOMM_USER,
      JSON.stringify(updatedUserData),
      {
        expires: 7,
      }
    );

    console.log("Form values:", updatedUserData);

    setIsEditable(false);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={260} style={{ background: "#f0f2f5" }}>
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }}>
          <Menu.Item
            key="1"
            icon={
              <UserOutlined style={{ fontSize: "25px", padding: "5px 10px" }} />
            }
            style={{ fontSize: "20px", padding: "0 30px", margin: "15px 0" }}
          >
            Profile
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={
              <ShoppingCartOutlined
                style={{ fontSize: "25px", padding: "5px 10px" }}
              />
            }
            style={{ fontSize: "20px", padding: "0 30px", margin: "15px 0" }}
          >
            Orders
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={
              <SettingOutlined
                style={{ fontSize: "25px", padding: "5px 10px" }}
              />
            }
            style={{ fontSize: "20px", padding: "0 30px", margin: "15px 0" }}
          >
            Settings
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={
              <CustomerServiceOutlined
                style={{ fontSize: "25px", padding: "5px 10px" }}
              />
            }
            style={{ fontSize: "20px", padding: "0 30px", margin: "15px 0" }}
          >
            Customer Service
          </Menu.Item>
          {/* <Menu.Item
            key="5"
            icon={
              <LogoutOutlined
                style={{ fontSize: "25px", padding: "5px 10px" }}
              />
            }
            style={{ fontSize: "20px", padding: "0 30px", margin: "15px 0" }}
            onClick={handleLogout}
          >
            Logout
          </Menu.Item> */}
        </Menu>
      </Sider>

      <Layout
        style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}
      >
        <Header style={{ background: "#fff", padding: 0 }} />

        <Content style={{ padding: "24px", margin: 0, minHeight: 280 }}>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Avatar size={100} style={{ backgroundColor: "#87d068" }}>
                {user?.name ? (
                  user.name.charAt(0).toUpperCase()
                ) : (
                  <UserOutlined />
                )}
              </Avatar>
              <div style={{ marginLeft: "16px" }}>
                <Title level={4} style={{ margin: 0 }}>
                  {user?.name || "Guest"}
                </Title>
              </div>
              <Button onClick={handleEdit}>Edit</Button>
            </div>

            <div style={{ marginTop: "20px" }}>
              <h3>Primary Contacts</h3>
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  email: user?.email || "",
                  phone: user?.phone || "",
                  firstName: user?.firstName || "",
                  lastName: user?.lastName || "",
                  address: user?.address || "",
                  city: user?.city || "",
                  postalCode: user?.postalCode || "",
                  county: user?.county || "",
                }}
              >
                {/* Email / Phone */}
                <div style={{ display: "flex", gap: "24px" }}>
                  <Form.Item
                    label="Email Address"
                    name="email"
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="Email Address" disabled={!isEditable} />
                  </Form.Item>

                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    style={{ flex: 1 }}
                  >
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      onChange={setPhone}
                      inputStyle={{ width: "100%" }}
                      disabled={!isEditable}
                      enableAreaCodes={true}
                      countryCodeEditable={true}
                      enableSearch={true}
                      placeholder="Enter phone number"
                    />
                  </Form.Item>
                </div>

                <h3>Personal Information</h3>

                {/* First Name / Last Name */}
                <div style={{ display: "flex", gap: "24px" }}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="First Name" disabled={!isEditable} />
                  </Form.Item>

                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="Last Name" disabled={!isEditable} />
                  </Form.Item>
                </div>

                {/* Address / City */}
                <div style={{ display: "flex", gap: "24px" }}>
                  <Form.Item label="Address" name="address" style={{ flex: 1 }}>
                    <Input placeholder="Address" disabled={!isEditable} />
                  </Form.Item>

                  <Form.Item label="City" name="city" style={{ flex: 1 }}>
                    <Input placeholder="City" disabled={!isEditable} />
                  </Form.Item>
                </div>

                {/* Postal Code / County */}
                <div style={{ display: "flex", gap: "24px" }}>
                  <Form.Item
                    label="Postal Code"
                    name="postalCode"
                    style={{ flex: 1 }}
                  >
                    <Input placeholder="Postal Code" disabled={!isEditable} />
                  </Form.Item>

                  <Form.Item label="County" name="county" style={{ flex: 1 }}>
                    <Input placeholder="County" disabled={!isEditable} />
                  </Form.Item>
                </div>

                {isEditable && (
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Save Changes
                    </Button>
                  </Form.Item>
                )}
              </Form>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Profile;
