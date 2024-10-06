import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Upload, Button, message } from 'antd';
// import { CreateProduct } from '../../../utils/productAPI';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const beforeUpload = (file) => {
  const isValidType = ['image/png', 'image/jpeg', 'image/webp', 'image/jpg', 'image/gif'].includes(file.type);
  if (!isValidType) {
    message.error('Chỉ chấp nhận các file định dạng .png, .jpeg, .webp, .jpg, .gif!');
  }
  // Nếu không hợp lệ, bỏ qua file upload
  return isValidType || Upload.LIST_IGNORE; 
};

function AddProduct() {
  // Xử lí submit form
  const onFinish = (values) => {
    // Post api
    console.log('Form values: ', values);
    // const result = await CreateProduct()
    message.success('Thêm mới thành công!');
  };

  return (
    <>        
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        style={{ width: '100%', minWidth: '600px' }}
        onFinish={onFinish}
      >
        <Form.Item label="Tên sản phẩm" name="input">
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="input">
          <Input />
        </Form.Item>

        <Form.Item label="Số lượng" name="inputNumber">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Chiết khấu" name="input">
          <Input />
        </Form.Item>

        <Form.Item label="Hình ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
          <Upload 
            action="/upload.do" 
            listType="picture-card"
            beforeUpload={beforeUpload}
            className="upload-list-inline"
          >
            <button
              style={{ border: 0, background: 'none' }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </button>
          </Upload>
        </Form.Item>

        {/* Nút Thêm ở cuối form */}
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Thêm
          </Button>
        </Form.Item>

      </Form>
    </>
  );
}

export default AddProduct