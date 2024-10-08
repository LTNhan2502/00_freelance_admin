import { ProductOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Space, Statistic, Table, Typography } from "antd";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { getTwoProductNew } from "../../../utils/productAPI";
import { getImages } from "../../../utils/getImage";

function Dashboard() {
  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Tổng quản bảng điều khiển</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <ProductOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.35)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Sản phẩm"}
          value={123}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.35)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Users"}
          value={5}
        />
      </Space>

      {/* Các sản phẩm gần đây */}
      <Space>
        <RecentProduct />
      </Space>
    </Space>
  );
}

const RecentProduct = () => {
  const [dataSource, setDataSource] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [loading, setLoading] = useState(false);

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
  

  useEffect(() => {
    fetcRecentProduct();
  }, []);

  const fetcRecentProduct = async () => {
    setLoading(true);
    const getRecentProduct = await getTwoProductNew();
    const result = getRecentProduct.data.data;

    if (result && getRecentProduct.data.data) {
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

  return (
    <>
      <Typography.Text>Các sản phẩm gần đây</Typography.Text>
      <Table
        columns={[
          {
            title: "Hình ảnh",
            dataIndex: "_id",
            render: (text, record) => (
              <img
                src={imageURLs[record._id]} // Sử dụng URL hình ảnh từ state
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
            title: "Đơn giá",
            dataIndex: "price",
            align: "center",
          },
          {
            title: "Số lượng",
            dataIndex: "quantity",
            align: "center",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        rowKey="_id"
      />
    </>
  );
};

const DashboardCard = ({ title, value, icon }) => {
  return (
    <Card className="dashboard-card">
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
};

export default Dashboard;
