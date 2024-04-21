import type { Cart } from '@/api/ResType';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart, selectCart, selectStatus } from '@/feature/cart/cartSlice';
import { BaseUrl } from '@/utils/request';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Descriptions, Empty, InputNumber, List, Modal, Popconfirm, Row, Space } from 'antd';
import React from 'react';

import * as cartServices from '@/api/cartServices';
import { Link } from 'react-router-dom';
function Purchase() {
    const baseUrl: BaseUrl = 'https://localhost:7005';
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
  
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want to detele!');

    const showModal = (cart: Cart) => {
        setOpen(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };

    return (
        <div>
            <Row gutter={24}>
                <Col className="gutter-row" span={16} xs={24} md={16} lg={16} xl={16}>
                    
                </Col>
                <Col className="gutter-row" span={8} xs={24} md={8} lg={8} xl={8}>
                {cart.items.map((e) => (
                        <Card key={e.id} style={{ width: '100%', marginBottom: 10 }}>
                            <Row gutter={[8, 8]}>
                                <Col className="gutter-row" span={6}>
                                    <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: '100%' }} />
                                </Col>
                                <Col className="gutter-row" span={10}>
                                    <Space align="start" direction="vertical">
                                        <p>{e.seoTitle}</p>
                                        <p>
                                            {e?.name} {e?.value}
                                        </p>
                                    </Space>
                                </Col>
                                <Col span={8}>
                                    {e.discountRate != null ? (
                                        <p style={{ textDecoration: 'line-through', color: 'red' }}>
                                            {ChangeCurrence(e?.priceBeforeDiscount)}
                                        </p>
                                    ) : (
                                        ''
                                    )}
                                    <p>{ChangeCurrence(e?.total)}</p>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                    <Descriptions title="Order infomation" bordered column={1}>
                        <Descriptions.Item label="Total price ">
                            {ChangeCurrence(cart.totalPriceBeforeDiscount)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Discount">
                            {ChangeCurrence(cart.totalDiscount)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total payment">{ChangeCurrence(cart.totalPrice)}</Descriptions.Item>
                    </Descriptions>
                    <Button size="large" block type="primary" style={{ marginTop: 10 }}>
                        Payment now!
                    </Button>
                </Col>
            </Row>
            <Modal
                title="Notification"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    );
}
const ChangeCurrence = (number: number) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
export default Purchase;
