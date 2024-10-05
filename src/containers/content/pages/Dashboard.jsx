import { ProductOutlined, UserOutlined } from '@ant-design/icons'
import { Card, Space, Statistic, Table, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import { getRecentProduct } from '../../../API/api'

function Dashboard() {
  return (
    <Space size={20} direction='vertical'>
      <Typography.Title level={4}>Tổng quản bảng điều khiển</Typography.Title>
      <Space direction='horizontal'>
        <DashboardCard 
          icon={<ProductOutlined
            style={{
              color: "green",
              backgroundColor: "rgba(0,255,0,0.35)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8 
            }}  
          />} 
          title={"Sản phẩm"} 
          value={123}
        />
        <DashboardCard 
          icon={<UserOutlined
            style={{
              color: "purple",
              backgroundColor: "rgba(0,255,255,0.35)",
              borderRadius: 20,
              fontSize: 24,
              padding: 8 
            }} 
          />} 
          title={"Users"} 
          value={5}
        />
      </Space>

      {/* Các sản phẩm gần đây */}
      <Space>
        <RecentProduct/>
      </Space>
    </Space>
  )
}

const DashboardCard = ({title, value, icon}) => {
  return(
    <Card className='dashboard-card'>
      <Space direction='horizontal'>
        {icon}
        <Statistic title={title} value={value}/>
      </Space>
    </Card>
  )
}

const RecentProduct = () => {
  const [dataSource, setDataSource] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true);
    getRecentProduct().then((res) => {
      // Chuyển đối tượng sản phẩm thành mảng để sử dụng trong bảng
      const productData = [res];
      setDataSource(productData);
      setLoading(false);
    });
  }, []);

  return(
    <>
      <Typography.Text>Các sản phẩm gần đây</Typography.Text>
      <Table
        columns={[
          {
            title: "Title",
            dataIndex: 'title'
          },
          {
            title: "Price",
            dataIndex: 'price'
          },
          {
            title: "Discount Percentage",
            dataIndex: "discountPercentage"
          },
          {
            title: "Brand",
            dataIndex: "brand"
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        rowKey="id"
      >

      </Table>
    </>
  )
}

export default Dashboard