import React from "react";
import { Layout, Menu, Button, Space } from "antd";
import {
  MedicineBoxOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const { Header } = Layout;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { token, user, role } = useSelector(
    (state) => state.auth
  );

  const menuItems = [
    {
      key: "/medicines",
      label: "Medicines",
    },
    {
      key: "/interactions",
      label: "Interactions",
    },
    {
      key: "/pharmacies",
      label: "Pharmacies",
    },
  ];

  // Show these options only when the user is logged in
  if (token) {
    menuItems.push(
      {
        key: "/prescriptions",
        label: "Prescriptions",
      },
      {
        key: "/favorites",
        label: "Favorites",
      }
    );
  }

  // Show Admin option only for ADMIN users
  if (
    token &&
    (role === "ADMIN" || user?.role === "ADMIN")
  ) {
    menuItems.push({
      key: "/admin",
      label: "Admin",
    });
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        background: "#001529",
        padding: "0 30px",
      }}
    >
      {/* MedMatch Logo / Brand */}
      <div
        onClick={() => navigate("/")}
        style={{
          color: "white",
          fontSize: "22px",
          fontWeight: "bold",
          marginRight: "30px",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        <MedicineBoxOutlined
          style={{
            marginRight: "8px",
          }}
        />
        MedMatch
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
        style={{
          flex: 1,
          minWidth: 0,
          background: "transparent",
        }}
      />

      {/* Login/Register OR User/Logout */}
      {token ? (
        <Space>
          <span
            style={{
              color: "white",
            }}
          >
            {user?.username || "User"}
          </span>

          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            style={{
              color: "white",
            }}
          >
            Logout
          </Button>
        </Space>
      ) : (
        <Space>
          <Button
            type="primary"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          <Button
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Space>
      )}
    </Header>
  );
}

export default Navbar;