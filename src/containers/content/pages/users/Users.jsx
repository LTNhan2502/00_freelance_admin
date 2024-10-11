import { Space, Table, Typography, Button, Modal, Input, Form, message} from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined, PlusCircleOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUser, updateAmountUser } from "../../../../utils/userAPI";
import { getBankByUserId } from "../../../../utils/bank";
  
function Users() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userBankInfo, setUserBankInfo] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null);
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

    // Fetch user's bank API
    const getAllUsersBank = async(userId) => {
        const res = await getBankByUserId(userId)
        const result = res.data.data

        if(result){
            setUserBankInfo(result);
        }
    }
  
    const handleEdit = async(user) => {
        setSelectedUser(user);
        // Mỗi lần nhấn mở edit thì sẽ gọi lại api này và set lại giá trị cho state
        await getAllUsersBank(user._id)
        setIsEditModalVisible(true);
    };
  
    const handleDelete = (record) => {
        console.log("Delete record:", record);
        // Gọi api delete
    };
  
    // Handle show modal nạp tiền
    const showModal = (user) => {
        setSelectedUser(user);
        setIsModalVisible(true);
    };
  
    const handleOk = () => {
        form.submit();
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };
  
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };
  
    // Hanlde nạp tiền
    const onFinish = async (values) => {
        const { amount } = values;
        const userId = selectedUser._id;
        try {
            const response = await updateAmountUser(userId, amount);
            console.log(response);
            message.success(`Nạp tiền thành công cho ${selectedUser.userName}!`);
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.log(error);
            message.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
  
    // Chấp nhận yêu cầu rút tiền
    const handleAcceptRequest = () => {
        setIsEditModalVisible(false);
        message.success(`Chấp nhận yêu cầu rút tiền cho ${selectedUser.userName}`);
    };
  
    // Từ chối yêu cầu rút tiền
    const handleRejectRequest = () => {
        setIsEditModalVisible(false);
        message.error(`Từ chối yêu cầu rút tiền của ${selectedUser.userName}`);
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
            title: "Số dư tài khoản (€)",
            dataIndex: "amount",
            align: "center",
        },
        {
            title: "Gói",
            dataIndex: "memberId",
            render: (memberId) => memberId?.packageName || "Chưa có",
        },
        {
            title: "Action",
            align: "right",
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<PlusOutlined />} onClick={() => showModal(record)} />
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
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
            <div style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
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
                title={`Thông tin nạp tiền của ${selectedUser?.userName}`}
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
    
            {/* Modal xử lý yêu cầu rút tiền */}
            <Modal
                title={`Yêu cầu rút tiền của ${selectedUser?.userName}`}
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="reject" onClick={handleRejectRequest}>
                        Từ chối
                    </Button>,
                    <Button key="accept" type="primary" onClick={handleAcceptRequest}>
                        Chấp nhận
                    </Button>,
                ]}
            >
                <p>Ngân hàng: {userBankInfo?.nameBank || "Chưa có"}</p>
                <p>Số tài khoản: {userBankInfo?.numberBank || "Chưa có"}</p>
                <p>Số tiền yêu cầu rút: {selectedUser?.moneyOut || "Chưa có"}</p>
            </Modal>
        </Space>
    );
  }
  
  export default Users;
  