import { AppstoreOutlined, DashboardOutlined, IdcardOutlined, LoginOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SideMenu() {
    const navigate = useNavigate();
  return (
    <div className='sideMenu'>
        <Menu 
            onClick={(item) => {
                navigate(item.key)
            }}
            items={[
                {
                    label: "Bảng điều khiển",
                    icon: <DashboardOutlined/>,
                    key: "/"
                },
                {
                    label: "Sản phẩm",
                    icon: <AppstoreOutlined/>,
                    key: "/products"
                },
                {
                    label: "Users",
                    icon: <UserOutlined/>,
                    key: "/users"
                },               
                {
                    label: "Gói thành viên",
                    icon: <IdcardOutlined/>,
                    key: "/memberships"
                },               
                {
                    label: "Logout",
                    icon: <LogoutOutlined />, 
                    onClick: () => {
                        localStorage.clear(); 
                        navigate("/login"); 
                        window.location.reload();
                    }
                }
                
            ]}>

        </Menu>
    </div>
  )
}

export default SideMenu