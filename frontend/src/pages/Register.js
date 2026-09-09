// import React from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Card,
//   Typography,
//   Select,
//   message,
// } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { register } from "../store/authSlice";
// import { useNavigate, Link } from "react-router-dom";

// const { Title } = Typography;

// function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { loading, error } = useSelector(
//     (state) => state.auth
//   );

//   const onFinish = async (values) => {
//     const result = await dispatch(register(values));

//     if (register.fulfilled.match(result)) {
//       message.success("Registration successful!");
//       navigate("/");
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "500px",
//         margin: "40px auto",
//       }}
//     >
//       <Card>
//         <Title
//           level={2}
//           style={{ textAlign: "center" }}
//         >
//           Create Account
//         </Title>

//         {error && (
//           <div
//             style={{
//               color: "red",
//               marginBottom: "15px",
//               textAlign: "center",
//             }}
//           >
//             {error}
//           </div>
//         )}

//         <Form
//           name="register"
//           layout="vertical"
//           onFinish={onFinish}
//         >
//           <Form.Item
//             label="Full Name"
//             name="fullName"
//             rules={[
//               {
//                 required: true,
//                 message:
//                   "Please input your Full Name!",
//               },
//             ]}
//           >
//             <Input placeholder="Full Name" />
//           </Form.Item>

//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message:
//                   "Please input your Email!",
//               },
//               {
//                 type: "email",
//                 message:
//                   "The input is not valid E-mail!",
//               },
//             ]}
//           >
//             <Input placeholder="Email Address" />
//           </Form.Item>

//           <Form.Item
//             label="Username"
//             name="username"
//             rules={[
//               {
//                 required: true,
//                 message:
//                   "Please input your Username!",
//               },
//             ]}
//           >
//             <Input placeholder="Username" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message:
//                   "Please input your Password!",
//               },
//             ]}
//           >
//             <Input.Password
//               placeholder="Password"
//             />
//           </Form.Item>

//           <Form.Item
//             label="Register as"
//             name="role"
//             initialValue="USER"
//           >
//             <Select>
//               <Select.Option value="USER">
//                 Patient / Regular User
//               </Select.Option>

//               <Select.Option value="ADMIN">
//                 Administrator
//               </Select.Option>
//             </Select>
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               block
//               loading={loading}
//             >
//               Sign Up
//             </Button>
//           </Form.Item>
//         </Form>

//         <div style={{ textAlign: "center" }}>
//           Already have an account?{" "}
//           <Link to="/login">
//             Sign in
//           </Link>
//         </div>
//       </Card>
//     </div>
//   );
// }

// export default Register;
import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    try {
      const result = await dispatch(
        register({
          fullName: values.fullName,
          email: values.email,
          username: values.username,
          password: values.password,
          role: "USER",
        })
      );

      if (register.fulfilled.match(result)) {
        message.success("Registration successful!");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: 420,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Create Account
        </Title>

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please enter your full name",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your full name"
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              {
                type: "email",
                message: "Please enter a valid email",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
            />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter a username",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Choose a username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
              {
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Create a password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
            />
          </Form.Item>

          {error && (
            <div
              style={{
                color: "red",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Register;