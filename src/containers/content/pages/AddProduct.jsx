import React, { useState } from 'react';
import { Form, Input, InputNumber, Button, Typography, message } from 'antd';
import { addProduct } from '../../../API/api';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values);
        
        setLoading(true);
        try {
            await addProduct(values); // Gọi API để thêm sản phẩm
            message.success('Sản phẩm đã được thêm thành công!');
            form.resetFields();
            // navigate('/products');
        } catch (error) {
            message.error('Có lỗi xảy ra khi thêm sản phẩm!');
            console.log(error);
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        >
            <Typography.Title level={4}>Thêm sản phẩm mới</Typography.Title>
            <Form.Item
                name="title"
                label="Tên sản phẩm"
                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="price"
                label="Đơn giá"
                rules={[{ required: true, message: 'Vui lòng nhập đơn giá!' }]}
            >
                <InputNumber min={0} />
            </Form.Item>
            <Form.Item
                name="category"
                label="Phân loại"
                rules={[{ required: true, message: 'Vui lòng nhập phân loại!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="brand"
                label="Hiệu"
                rules={[{ required: true, message: 'Vui lòng nhập hiệu!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Thêm sản phẩm
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddProduct;
