import { Space, Table, Typography, Button } from 'antd'
import React, { useEffect, useState } from 'react'
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../../../utils/userAPI';

function Users() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        getAllUsers();
    }, []);


    const getAllUsers = async() => {
        setLoading(true)
        const res = await getUser();
        console.log(res);
        
        // if(res && res.data){
        //     setLoading(false)
        //     setDataSource(result)
        // }
    }

    const handleEdit = (id) => {
        navigate(`/products/${id}`);
    }

    const handleDelete = (record) => {
        console.log('Delete record:', record);
        // Thực hiện các thao tác xóa
    }

    const handleView = (id) => {
        navigate(`/products/${id}`);
    }


    const handleCreate = () => {
        navigate('/products/add');
    }

    const columns = [
        {
            title: "Tên user",
            dataIndex: "title"
        },
        {
            title: "Số dư",
            dataIndex: "category"
        },
        {
            title: "Yêu cầu rút tiền",
            dataIndex: "price",
            render: (_, { tags }) => (
                <>
                  {tags.map((tag) => {
                    // tag.length > 5 sẽ phải thay bằng data (dataAPI.data.reqWithraw === true)
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    // tag === 'loser' sẽ phải thay bằng data (dataAPI.data.reqStatus === 'pending')
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return (
                      <Tag color={color} key={tag}>
                        {tag.toUpperCase()}
                      </Tag>
                    );
                  })}
                </>
              ),
        },
        {
            title: "Phê duyệt",
            dataIndex: "stock"
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
    ]

    return (
        <Space size={20} direction='vertical'>
            <Typography.Title level={4}>Users</Typography.Title>
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                <Button 
                    icon={<PlusCircleOutlined />}
                    size='large'
                    onClick={() => handleCreate()}
                >
                    
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                rowKey="id"
            />
        </Space>
    )
}

export default Users
