import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Upload, Button, message } from "antd";
import { CreateProduct } from "../../../utils/productAPI";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const beforeUpload = (file) => {
  const isValidType = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/jpg",
    "image/gif",
  ].includes(file.type);
  if (!isValidType) {
    message.error(
      "Chỉ chấp nhận các file định dạng .png, .jpeg, .webp, .jpg, .gif!"
    );
  }
  // Nếu không hợp lệ, bỏ qua file upload
  return isValidType || Upload.LIST_IGNORE;
};

function AddProduct() {
  // Xử lí submit form
  const onFinish = async (values) => {
    // Lấy thông tin từ form
    const productName = values.productName;
    const price = values.price;
    const quantity = values.quantity;
    // Lấy hình ảnh
    const imageFile = values.fileList?.[0]?.originFileObj;
    // console.log("values", values);

    const formData = new FormData();
    formData.append("imageProduct", imageFile.name);
    formData.append("productName", productName);
    formData.append("price", price);
    formData.append("quantity", quantity);

    //Kiểm tra thêm sản phẩm ở đây
    formData.append("imageProduct", imageFile);
    // const imgFile = formData.get("imageProduct");
    // const imageProduct = imgFile.name;
    // const typeQ = typeof quantity;
    // const typeP = typeof price;

    // Xem console.log tại đây
    // console.log("Kiểu dữ liệu của quantity:", typeQ);
    // console.log("Kiểu dữ liệu của price:", typeP);
    // console.log("Name của imageProduct:", imageProduct);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      // Gọi API với dữ liệu sản phẩm và mảng file ảnh
      const result = await CreateProduct(formData);
      console.log("Kết quả API:", result);
      message.success("Thêm mới thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
      message.error("Thêm mới thất bại!");
    }
  };

  return (
    <>
      <Form
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        layout="vertical"
        style={{ width: "100%", minWidth: "600px" }}
        onFinish={onFinish}
      >
        <Form.Item label="Tên sản phẩm" name="productName">
          <Input />
        </Form.Item>

        <Form.Item label="Giá" name="price">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Số lượng" name="quantity">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Hình ảnh"
          name="fileList"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action="/upload.do"
            listType="picture-card"
            multiple={false}
            beforeUpload={beforeUpload}
            className="upload-list-inline"
          >
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Tải lên</div>
            </button>
          </Upload>
        </Form.Item>

        {/* Nút Thêm ở cuối form */}
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Thêm
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AddProduct;
