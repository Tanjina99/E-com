import Login from "@/components/auth/Login";
import { Dropdown, Form, Switch } from "antd";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";

function UserDetails({ user }) {
  return (
    <div
      style={{
        padding: "10px 0",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "15px", margin: "5px 0" }}>
        {user?.userInfo?.user?.name || "User"}
      </h1>
      <p style={{ margin: "5px 0 0" }}>{user?.userInfo?.user?.email}</p>
    </div>
  );
}

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleDocumentClick = (event) => {
      const isDropdown = event.target.closest(".drop");
      const isLoginContainer = event.target.closest(".user_login_container");

      // Close dropdown only if the click is outside of dropdown and login container
      if (!isDropdown && !isLoginContainer) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    // Remove the authentication token from cookies
    Cookies.remove(process.env.NEXT_PUBLIC_ECOMM_USER, { path: "/" });

    // Redirect to the homepage and refresh to show the login form
    router.replace("/").then(() => router.reload());
  };

  const itemsLogin = [
    {
      key: "1",
      label: <Login />,
    },
  ];

  const itemsUser = [
    {
      key: "1",
      label: <UserDetails user={user} />,
    },
    {
      key: "2",
      label: (
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "10px",
            borderRadius: "2px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => console.log("Location clicked")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ac1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          Location
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "10px",
            borderRadius: "4px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => console.log("Language clicked")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ac1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          Language
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "10px",
            borderRadius: "4px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => console.log("Contact Preferences clicked")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ac1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          Contact Preferences
        </div>
      ),
    },
    {
      key: "5",
      label: (
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "10px",
            borderRadius: "4px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ac1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          <Form.Item
            label="Notification Preferences"
            valuePropName="checked"
            style={{ margin: 0 }}
          >
            <Switch
              onChange={(checked) => {
                console.log(
                  `Notification Preferences ${checked ? "enabled" : "disabled"}`
                );
              }}
            />
          </Form.Item>
        </div>
      ),
    },
    {
      key: "6",
      label: (
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "10px",
            borderRadius: "4px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => console.log("Currency clicked")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ac1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          Currency
        </div>
      ),
    },
    {
      key: "7",
      label: (
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "10px",
            borderRadius: "4px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={() => console.log("Payment Option clicked")}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ac1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          Payment Option
        </div>
      ),
    },
    {
      key: "8",
      label: (
        <div
          style={{
            border: "1px solid #e0e0e0",
            padding: "10px",
            borderRadius: "4px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onClick={handleLogout} // Logout handler
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#27ac1f")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#f0f0f0")
          }
        >
          Logout
        </div>
      ),
    },
  ];

  return (
    <div ref={dropdownRef}>
      {" "}
      <Dropdown
        open={isOpen}
        placement="bottom"
        className="drop"
        menu={{
          items: user?.userInfo?.user?.email ? itemsUser : itemsLogin,
        }}
        trigger={["click"]}
        onClick={handleDropdown}
      >
        <div>
          <span>
            <i className="far fa-user"></i>
          </span>
        </div>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
