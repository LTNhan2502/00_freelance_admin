import { Button, Form, Input, InputNumber, message } from 'antd'
import React from 'react'
import { CreateMemberPackage } from '../../../../utils/memberPackageAPI'

function AddMembership() {

    // Xử lí submit form
    const onFinish = async (values) => {
        // Lấy thông tin từ form
        const packageName = values.packageName;
        const price = values.price;
        const distribution = values.distribution;
        const discountFrom = values.discountFrom;
        const discountTo = values.discountTo;

        try {
        // Gọi API với dữ liệu sản phẩm và mảng file ảnh
        const result = await CreateMemberPackage(packageName, price, distribution, discountFrom, discountTo);
        message.success("Thêm mới thành công!");
        } catch (error) {
        console.error("Lỗi khi thêm sản phẩm:", error);
        message.error("Thêm mới thất bại!");
        }
    };
    

    return (
        <>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                style={{ width: "100%", minWidth: "600px" }}
                onFinish={onFinish}
            >
                <Form.Item label="Tến gói" name="packageName"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống"
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Phí nâng cấp" name="price"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống"
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    label="Chiết khấu"
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item
                        name="discountFrom"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống"
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                    >
                        <InputNumber placeholder="Từ" style={{ width: "100%" }}/>
                    </Form.Item>
                    <Form.Item
                        name="discountTo"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống"
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                            margin: '0 8px',
                        }}
                    >
                        <InputNumber placeholder="Đến" style={{ width: "100%" }}/>
                    </Form.Item>
                </Form.Item>

                <Form.Item label="Lượt phân phối" name="distribution"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống"
                        },
                    ]}
                >
                    <InputNumber style={{ width: "100%" }} />
                </Form.Item>

                {/* Nút Thêm ở cuối form */}
                <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddMembership