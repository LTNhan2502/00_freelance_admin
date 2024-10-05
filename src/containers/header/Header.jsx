import { BellFilled, MailOutlined } from '@ant-design/icons'
import { Badge, Space, Typography } from 'antd'
import React from 'react'

function Header() {
  return (
    <div className='appHeader'>
        <Typography.Title>Website</Typography.Title>
        <Space>
            <Badge count={10} dot>
                <MailOutlined style={{fontSize: 24}}/>
            </Badge>
            <Badge count={10}>
                <BellFilled style={{fontSize: 24}}/>
            </Badge>
        </Space>
    </div>
  )
}

export default Header