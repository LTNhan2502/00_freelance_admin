import { Space, Table, Typography, Button, Modal, Input, Form, message} from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined, PlusOutlined, PlusCircleOutlined, BellOutlined} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { getUser, updateAmountUser } from "../../../../utils/userAPI";
import { getAllHistoryBank, getBankByUserId } from "../../../../utils/bank";
  
function Users() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [userBankInfo, setUserBankInfo] = useState(null)
    const [userBankHistory, setUserBankHistory] = useState(null);
    const [moneyOut, setMoneyOut] = useState(0);
    const [deposit, setDeposit] = useState(0);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();
  
    useEffect(() => {
        getAllUsers();
        getAllHistoryMoney()
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

    // Fetch all history bank
    const getAllHistoryMoney = async() => {
        const res = await getAllHistoryBank()
        const result = res.data.data 
        
        if(result && res.data.data){
            setUserBankHistory(result)
            console.log(userBankHistory);            
        }
    }
  
    const handleDeposit = async(user) => {
        const selectedUserHistory = userBankHistory.find((userHistory) => user._id === userHistory.userId && userHistory.statusDeposit === "waiting")
        console.log(selectedUserHistory);
        
        if (selectedUserHistory) {
            setSelectedUser(user);
            // Mỗi lần nhấn mở modal nạp tiền thì sẽ gọi lại api này và set lại giá trị cho state
            // Để modal có thể nhận dữ liệu đúng
            await getAllUsersBank(user._id);

            setDeposit(selectedUserHistory.deposit)
            setIsModalVisible(true);
        } else {
            message.info("Không có yêu cầu nạp tiền nào");
        }
    };

    const handleWithdraw = async(user) => {
        const selectedUserHistory = userBankHistory.find((userHistory) => user._id === userHistory.userId && userHistory.statusWithdraw === "waiting")
        console.log(selectedUserHistory);
        
        if (selectedUserHistory) {
            setSelectedUser(user);
            // Mỗi lần nhấn mở modal rút tiền thì sẽ gọi lại api này và set lại giá trị cho state
            // Để modal có thể nhận dữ liệu đúng
            await getAllUsersBank(user._id);
            
            setMoneyOut(selectedUserHistory.moneyOut)
            setIsEditModalVisible(true);
        } else {
            message.info("Không có yêu cầu rút tiền nào");
        }
    };
  
    const handleDelete = (record) => {
        console.log("Delete record:", record);
        // Gọi api delete
    };
  
    const handleCancel = () => {
        setIsModalVisible(false);
    };
  
    const handleEditCancel = () => {
        setIsEditModalVisible(false);
    };
  
    // // Hanlde nạp tiền
    // const onFinish = async (values) => {
    //     const { amount } = values;
    //     const userId = selectedUser._id;
    //     try {
    //         const response = await updateAmountUser(userId, amount);
    //         console.log(response);
    //         message.success(`Nạp tiền thành công cho ${selectedUser.userName}!`);
    //         setIsModalVisible(false);
    //         form.resetFields();
    //     } catch (error) {
    //         console.log(error);
    //         message.error("Có lỗi xảy ra, vui lòng thử lại!");
    //     }
    // };
  
    // Chấp nhận yêu cầu nạt tiền
    const handleAcceptDeposit = () => {
        // Gọi api cập nhật lại số dư user
        setIsModalVisible(false);
        message.success(`Chấp nhận yêu cầu nạt tiền cho ${selectedUser.userName}`);
    };
  
    // Từ chối yêu cầu nạt tiền
    const handleRejectDeposit = () => {
        setIsEditModalVisible(false);
        message.error(`Từ chối yêu cầu nạt tiền của ${selectedUser.userName}`);
    };

    // Chấp nhận yêu cầu rút tiền
    const handleAcceptWithdraw = () => {
        // Gọi api cập nhật lại số dư user
        setIsEditModalVisible(false);
        message.success(`Chấp nhận yêu cầu rút tiền cho ${selectedUser.userName}`);
    };
  
    // Từ chối yêu cầu rút tiền
    const handleRejectWithdraw = () => {
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
                    {/* Nạp tiền */}
                    <Button 
                        icon={<PlusOutlined />} 
                        onClick={() => handleDeposit(record)} 
                    />

                    {/* Rút tiền */}
                    <Button
                        icon={<BellOutlined />}
                        onClick={() => handleWithdraw(record)}
                    />

                    {/* Xoá */}
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
                onCancel={handleCancel}
                footer={[
                    <Button key="reject" onClick={handleRejectDeposit}>
                        Từ chối
                    </Button>,
                    <Button key="accept" type="primary" onClick={handleAcceptDeposit}>
                        Chấp nhận
                    </Button>,
                ]}
            >
                <p>Ngân hàng: {userBankInfo?.nameBank || "Chưa có"}</p>
                <p>Số tài khoản: {userBankInfo?.numberBank || "Chưa có"}</p>
                <p>Số tiền yêu cầu nạp: {`${deposit} €` || "Chưa có"}</p>
            </Modal>
    
            {/* Modal xử lý yêu cầu rút tiền */}
            <Modal
                title={`Yêu cầu rút tiền của ${selectedUser?.userName}`}
                visible={isEditModalVisible}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="reject" onClick={handleRejectWithdraw}>
                        Từ chối
                    </Button>,
                    <Button key="accept" type="primary" onClick={handleAcceptWithdraw}>
                        Chấp nhận
                    </Button>,
                ]}
            >
                <p>Ngân hàng: {userBankInfo?.nameBank || "Chưa có"}</p>
                <p>Số tài khoản: {userBankInfo?.numberBank || "Chưa có"}</p>
                <p>Số tiền yêu cầu rút: {`${moneyOut} €` || "Chưa có"}</p>
            </Modal>
        </Space>
    );
  }
  
  export default Users;
  