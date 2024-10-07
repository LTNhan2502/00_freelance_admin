import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { CreateProduct } from '../../../../utils/productAPI'

function AddMembership() {

    const onFinish = async (values) => {
        const membership_name = values.membership_name
        const membership_fee = values.membership_fee
        const membership_discount_from = values.membership_discount_from
        const membership_discount_to = values.membership_discount_to
        const membership_distribution = values.membership_distribution

        const formData = new FormData()
        formData.append("membership_name", membership_name)
        formData.append("membership_fee", membership_fee)
        formData.append("membership_discount_from", membership_discount_from)
        formData.append("membership_discount_to", membership_discount_to)
        formData.append("membership_distribution", membership_distribution)

        try {
            // Gọi api tại đây
            // const result = await CreateProduct(formData)
            message.success("Thêm mới thành công")
        } catch (error) {
            console.error("Lỗi khi thêm gói thành viên: ", error);
            message.error("Thêm mới thất bại")
        }
    }

    return (
        <>
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                style={{ width: "100%", minWidth: "600px" }}
                onFinish={onFinish}
            >
                <Form.Item 
                    label="Tên gói" name="membership_name"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống"
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item 
                    label="Phí nâng cấp" name="membership_fee"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống"
                        }
                    ]}    
                >
                    <Input/>
                </Form.Item>

                <Form.Item 
                    label="Chiết khấu" name="membership_discount" 
                    rules={[
                        {
                            required: true,
                            message: ""
                        }
                    ]}               
                >
                    <Form.Item 
                        name="membership_discount_from"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống"
                            }
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                    >
                        <Input placeholder='Từ'/>
                    </Form.Item>
                    <Form.Item 
                        name="membership_discount_to"
                        rules={[
                            {
                                required: true,
                                message: "Không được để trống"
                            }
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                            margin: '0 8px',
                        }}
                    >
                        <Input placeholder='Đến'/>
                    </Form.Item>
                </Form.Item>

                <Form.Item
                    label="Lượt phân phối" name="membership_distribution"
                    rules={[
                        {
                            required: true,
                            message: "Không được để trống"
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item label=" " colon={false}>
                    <Button type="primary" htmlType="submit" style={{width: "100%"}}>
                        Thêm
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default AddMembership