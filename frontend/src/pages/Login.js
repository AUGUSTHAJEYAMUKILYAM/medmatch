import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/authSlice";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state) => state.auth);

  const onFinish = async (values) => {
    const result = await dispatch(login(values));

    if (login.fulfilled.match(result)) {
      message.success("Login successful!");
      navigate("/");
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "50px auto",
      }}
    >
      <Card>
        <Title level={2} style={{ textAlign: "center" }}>
          Sign In
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
          name="login"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input placeholder="email@test.com" />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register">
            Register now
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;