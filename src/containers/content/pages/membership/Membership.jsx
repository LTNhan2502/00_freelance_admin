import { Button, message, Space, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getAllMemberPackage } from "../../../../utils/memberPackageAPI";

function Membership() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "Tên gói",
      dataIndex: "membership_name",
    },
    {
      title: "Phí nâng cấp",
      dataIndex: "membership_fee",
    },
    {
      title: "Chiết khấu",
      dataIndex: "membership_discount",
    },
    {
      title: "Lượt phân phối",
      dataIndex: "membership_distribution",
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

  // Dữ liệu cứng (mock data)
  const mockMembershipData = [
    {
      id: 1,
      membership_name: "Bạc",
      membership_fee: "0 €",
      membership_discount: "5%",
      membership_distribution: 10,
    },
    {
      id: 2,
      membership_name: "Vàng",
      membership_fee: "1000 €",
      membership_discount: "10%",
      membership_distribution: 20,
    },
    {
      id: 3,
      membership_name: "Bạch kim",
      membership_fee: "5000 €",
      membership_discount: "15%",
      membership_distribution: 30,
    },
  ];

  // Giả lập fetch data
  const fetchAllMembership = async () => {
    setLoading(true);
    const getMemberPackages = await getAllMemberPackage();
    console.log(getMemberPackages);
    setDataSource(getMemberPackages);
    setLoading(false);
  };

  useEffect(() => {
    fetchAllMembership();
  }, []);

  const handleCreate = () => {
    navigate("/memberships/add");
  };

  const handleView = (id) => {
    console.log("View record:", id);
  };

  const handleEdit = (id) => {
    console.log("Edit record:", id);
  };

  const handleDelete = (record) => {
    message.success("Xoá thử thành công:", record);
  };

  return (
    <Space direction="vertical">
      <Typography.Title level={4}>Gói thành viên</Typography.Title>
      <div
        style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
      >
        <Button
          icon={<PlusCircleOutlined />}
          size="large"
          onClick={() => handleCreate()}
        >
          Thêm gói
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        rowKey="id"
      ></Table>
    </Space>
  );
}

export default Membership;
