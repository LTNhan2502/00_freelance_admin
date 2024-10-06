import { Button, Form, Input, message, Typography } from 'antd'
import React from 'react'
import './Login.css'

function Login() {
    const onFinish = (values) => {
        //Get api để check var
        message.success("Đăng nhập thành công")
    }

  return (
    <div className='appBg'>
        <div className='login-container'>
            <Typography.Title className='text-center mb-2'>Website</Typography.Title>
            <Form className='loginForm' layout='vertical' onFinish={onFinish}>
                <Typography.Title level={3} className='text-center'>Chào mừng trở lại!</Typography.Title>
                <Form.Item label='Email' name={'adminEmail'}
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: "Vui lòng nhập email"
                        }
                    ]}
                >
                    <Input placeholder='Nhập email'></Input>
                </Form.Item>
                <Form.Item label='Password' name={'adminPassword'}
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập mật khẩu'
                        }
                    ]}
                >
                    <Input.Password placeholder='Nhập mật khẩu'></Input.Password>
                </Form.Item>
                <Button type='primary' htmlType='submit' block>Đăng nhập</Button>
            </Form>
        </div>
    </div>
  )
}

export default Login