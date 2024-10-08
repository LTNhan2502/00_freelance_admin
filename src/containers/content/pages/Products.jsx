import { Space, Table, Typography, Button } from "antd";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../../utils/productAPI.js";
import { getImages } from "../../../utils/getImage"; // Import hàm lấy ảnh
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
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoading(true);
    const productData = await getAllProduct();
    const result = productData.data.data;
    console.log(productData.data.data);

    if (result && productData.data.data) {
      setDataSource(result);

      // Fetch hình ảnh cho mỗi sản phẩm và lưu URL vào state
      const imageFetchPromises = result.map(async (product) => {
        const imageUrl = await fetchImage(product.imageProduct);
        return { [product._id]: imageUrl }; // Sử dụng product._id làm key
      });

      const imageResults = await Promise.all(imageFetchPromises);
      const imagesMap = Object.assign({}, ...imageResults); // Tạo object chứa image URLs
      setImageURLs(imagesMap);

      setLoading(false);
    }
  };

  // Hàm fetch hình ảnh và lưu URL vào state
  const fetchImage = async (imageName) => {
    try {
      const result = await getImages(imageName);
      const imageUrl = URL.createObjectURL(result.data); // Tạo URL từ blob
      return imageUrl; // Chỉ trả về URL mà không tạo thẻ img
    } catch (error) {
      console.error("Lỗi khi lấy hình ảnh:", error);
      return null;
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
      title: "Hình ảnh",
      dataIndex: "imageProduct",
      render: (text, record) => (
        <img
          src={imageURLs[record._id]}
          alt={record.productName}
          style={{ width: 50, height: 50, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
    },
    {
      title: "User sở hữu",
      dataIndex: "userName",
      align: "center",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="middle">
          <Button icon={<EyeOutlined />} onClick={() => handleView(record.id)} />
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
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
      <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
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
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
}

export default Products;
