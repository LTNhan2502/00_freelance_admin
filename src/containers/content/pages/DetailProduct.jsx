import React, { useEffect, useState } from 'react'
import { getTargetProduct } from '../../../API/api'
import { useParams } from 'react-router-dom'
import { Space, Typography, Table } from 'antd'

function DetailProduct() {
    const { id } = useParams(); // Lấy id từ URL
    const [loading, setLoading] = useState(false);
    const [dataProduct, setDataProduct] = useState(null); // Sửa thành null để phù hợp với một object

    useEffect(() => {
        setLoading(true);
        getTargetProduct(id).then(res => {
            setDataProduct(res);
            setLoading(false);
        });
    }, [id]); // Chỉ chạy khi `id` thay đổi

    // Cấu trúc cột cho Table
    const columns = [
        {
            title: 'Tên thuộc tính',
            dataIndex: 'key',
        },
        {
            title: 'Giá trị',
            dataIndex: 'value',
        },
    ];

    // Chuyển đổi dữ liệu sản phẩm thành mảng key-value để hiển thị
    const productData = dataProduct
        ? Object.entries({
            Title: dataProduct.title,
            Price: `${dataProduct.price} €`,
            Category: dataProduct.category,
            Brand: dataProduct.brand,
            Stock: dataProduct.stock,
            'Discount Percentage': `${dataProduct.discountPercentage}%`,
            Description: dataProduct.description,
        }).map(([key, value]) => ({ key, value })) // Định dạng thành key-value cho bảng
        : [];

    return (
        <Space direction="vertical" size={20} style={{ width: '100%' }}>
            <Typography.Title level={4}>Chi tiết sản phẩm</Typography.Title>
            <Table
                columns={columns}
                dataSource={productData}
                loading={loading}
                pagination={false} // Tắt phân trang vì chỉ có 1 dòng
                rowKey="key"
            />
        </Space>
    );
}

export default DetailProduct;
