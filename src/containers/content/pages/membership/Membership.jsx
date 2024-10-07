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

    useEffect(() => {
        fetchAllMembership();
    }, []);
    
    // Fetch api
    const fetchAllMembership = async () => {
        setLoading(true);
        const getMemberPackages = await getAllMemberPackage();
        const result = getMemberPackages.data.data
        
        if(result && getMemberPackages.data.data){
            setDataSource(result);
            setLoading(false);
        }
    };
    
    const columns = [
      {
        title: "Tên gói",
        dataIndex: "packageName",
      },
      {
        title: "Phí nâng cấp",
        dataIndex: "price",
        align: 'center',
      },
      {
        title: "Chiết khấu",
        align: 'center',
        render: (text, record) => `${record.discountFrom} - ${record.discountTo}`,
      },
      {
        title: "Lượt phân phối",
        dataIndex: "distribution",
        align: 'center',
      },
      {
        title: "Action",
        align: 'right',
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
                rowKey="_id"
            ></Table>
        </Space>
    );
}

export default Membership;
