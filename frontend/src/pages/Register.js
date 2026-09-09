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

//   const { loading, error } = useSelector((state) => state.auth);

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
//         <Title level={2} style={{ textAlign: "center" }}>
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
//                 message: "Please input your Full Name!",
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
//                 message: "Please input your Email!",
//               },
//               {
//                 type: "email",
//                 message: "The input is not valid E-mail!",
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
//                 message: "Please input your Username!",
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
//                 message: "Please input your Password!",
//               },
//             ]}
//           >
//             <Input.Password placeholder="Password" />
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
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const onFinish = async (values) => {
    const result = await dispatch(register(values));

    if (register.fulfilled.match(result)) {
      message.success("Registration successful!");
      navigate("/");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
      }}
    >
      <Card>
        <Title
          level={2}
          style={{ textAlign: "center" }}
        >
          Create Account
        </Title>

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <Form
          name="register"
          layout="vertical"
          onFinish={onFinish}
        >
          {/* Full Name */}
          <Form.Item
            label="Full Name"
            name="fullName"
            rules={[
              {
                required: true,
                message:
                  "Please input your Full Name!",
              },
            ]}
          >
            <Input placeholder="Full Name" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message:
                  "Please input your Email!",
              },
              {
                type: "email",
                message:
                  "The input is not valid E-mail!",
              },
            ]}
          >
            <Input placeholder="Email Address" />
          </Form.Item>

          {/* Username */}
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message:
                  "Please input your Username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message:
                  "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
            />
          </Form.Item>

          {/* Submit */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;