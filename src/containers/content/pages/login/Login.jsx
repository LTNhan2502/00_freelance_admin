import { Button, Form, Input, message, Typography } from "antd";
import React from "react";
import "./Login.css";
import { loginAdmin } from "../../../../utils/adminAPI";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const resultLogin = await loginAdmin(values.userName, values.password);
    console.log("Result:", resultLogin.data);
    if (resultLogin.data && resultLogin.data.EC === 0) {
      message.success("Đăng nhập thành công");
      localStorage.setItem("access_token", resultLogin.data.token);
      navigate("/");
    } else {
      message.error("Đăng nhập không thành công");
    }
    //Get api để check var
    // console.log(values);
  };

  return (
    <div className="appBg">
      <div className="login-container">
        <Typography.Title className="text-center mb-2">
          Website
        </Typography.Title>
        <Form className="loginForm" layout="vertical" onFinish={onFinish}>
          <Typography.Title level={3} className="text-center">
            Chào mừng trở lại!
          </Typography.Title>
          <Form.Item
            label="Username"
            name={"userName"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản",
              },
            ]}
          >
            <Input placeholder="Nhập email"></Input>
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password placeholder="Nhập mật khẩu"></Input.Password>
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Đăng nhập
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
