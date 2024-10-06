import { Space, Table, Typography, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../../utils/productAPI.js";
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function Products() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        setLoading(true);
        const productData = await getAllProduct();
        const result = productData.data.data
        // Đã fix
        console.log(productData.data.data);

        if (result && productData.data.data) {
            setLoading(false);
            setDataSource(result);
        }
    };

  const handleEdit = (id) => {
    navigate(`/products/${id}`);
  };

  const handleDelete = (record) => {
    console.log("Delete record:", record);
    // Thực hiện các thao tác xóa
  };

  const handleView = (id) => {
    navigate(`/products/${id}`);
  };

  const handleCreate = () => {
    navigate("/products/add");
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
    },
    {
      title: "Trang thái",
      dataIndex: "stock",
    },
    {
      title: "User sở hữu",
      dataIndex: "brand",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleView(record.id)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.id)}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            danger
          />
        </Space>
      ),
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Products</Typography.Title>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <Button
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={() => handleCreate()}
        ></Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
      />
    </Space>
  );
}

export default Products;
