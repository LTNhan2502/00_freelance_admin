import {
  Space,
  Table,
  Typography,
  Button,
  Modal,
  Input,
  Form,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUser, updateAmountUser } from "../../../../utils/userAPI";

function Users() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    getAllUsers();
  }, []);

    // Fetch users API
    const getAllUsers = async () => {
        setLoading(true);
        const usersData = await getUser();
        const result = usersData.data.data;
        console.log(result);
        
        // Handle thêm số 0 cho sđt
        if (result) {
            const modifiedData = result.map((item) => ({
                ...item,
                numberPhone: "0" + item.numberPhone,
            }));
            setDataSource(modifiedData);
        }
        setLoading(false);
    };

  const handleEdit = (id) => {
    console.log();
    // navigate(`/products/${id}`);
  };

  const handleDelete = (record) => {
    console.log("Delete record:", record);
    // Gọi api delete
  };

  // Handle show modal
  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalVisible(true);
  };

  // Handle submit form rồi đóng form
  const handleOk = () => {
    form.submit(); // Kích hoạt submit form khi nhấn OK
  };

  // Handle cancel form
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Hanlde nạp tiền
  const onFinish = async (values) => {
    const { amount } = values;
    const userId = selectedUser._id;
    try {
        const response = await updateAmountUser(userId, amount);
        console.log(response);

        console.log(userId);
        console.log(amount);
        message.success(`Nạp tiền thành công cho ${selectedUser.userName}!`);
        setIsModalVisible(false);
        form.resetFields();
    } catch (error) {
        console.log(error);
        console.log(userId);
        console.log(amount);
        message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleCreate = () => {
    navigate("/products/add");
  };

    const columns = [
        {
            title: "Tên user",
            dataIndex: "userName",
        },
        {
            title: "Số điện thoại",
            dataIndex: "numberPhone",
        },
        {
            title: "Mã giới thiệu",
            dataIndex: "referralCode",
        },
        {
            title: "Số dư tài khoản",
            dataIndex: "amount",
            align: "center"
        },
        {
            title: "Gói",
            dataIndex: "__v",
        },
        {
            title: "Action",
            render: (text, record) => (
                <Space size="middle">
                    <Button 
                        icon={<PlusOutlined />} 
                        onClick={() => showModal(record)}
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
        <Typography.Title level={4}>Users</Typography.Title>
        <div
            style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
        >
            <Button
                icon={<PlusCircleOutlined />}
                size="large"
                onClick={handleCreate}
            >
                Thêm User
            </Button>
        </div>
        <Table
            columns={columns}
            dataSource={dataSource}
            loading={loading}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
        />

        {/* Modal nạp tiền */}
        <Modal
            title={`Thông tin nạp tiền của ${selectedUser?.userName}`} // Hiển thị tên user trong tiêu đề modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <div>
                <Form form={form} onFinish={onFinish}>
                    <Form.Item
                        name="amount"
                        label="Số tiền nạp"
                        rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
                    >
                        <Input type="number" placeholder="Nhập số tiền" />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    </Space>
  );
}

export default Users;
