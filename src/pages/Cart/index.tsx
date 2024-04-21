import type { Cart } from '@/api/ResType';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart, selectCart, selectStatus } from '@/feature/cart/cartSlice';
import { BaseUrl } from '@/utils/request';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Descriptions, Empty, InputNumber, List, Modal, Popconfirm, Row, Space } from 'antd';
import React from 'react';

import * as cartServices from '@/api/cartServices';
import { Link } from 'react-router-dom';
function Cart() {
    const baseUrl: BaseUrl = 'https://localhost:7005';
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const [currentCart, setCurrentCart] = React.useState<Cart>();
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want to detele!');

    const showModal = (cart: Cart) => {
        setOpen(true);
        setCurrentCart(cart);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(async () => {
            setOpen(false);
            if (currentCart != undefined) {
                const res = await cartServices.deleteCart(currentCart?.id);
                if (res.isSuccessed == true) {
                    dispatch(addToCart(res.resultObj));
                }
            }
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const increase = () => {};
    const decline = () => {
        let newCount = 0 - 1;
        if (newCount < 1) {
            newCount = 1;
        }
    };
    return (
        <div>
            <Row gutter={24}>
                <Col className="gutter-row" span={16} xs={24} md={16} lg={16} xl={16}>
                    {cart.items.length == 0 ? (
                        <>
                            <Empty
                                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                imageStyle={{ height: 60 }}
                                
                            >
                                <Link to={'/product/all'}><Button type="primary">Shopping now !</Button></Link>
                            </Empty>
                        </>
                    ) : (
                        cart.items.map((e) => (
                            <Card key={e.id} style={{ width: '100%', marginBottom: 10 }}>
                                <Row gutter={[8, 8]}>
                                    <Col className="gutter-row" span={6}>
                                        <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: '100%' }} />
                                    </Col>
                                    <Col className="gutter-row" span={10}>
                                        <Space align="start" direction="vertical">
                                            <p>{e.seoTitle}</p>
                                            <p>{e?.name} {e?.value}</p>

                                            <Space.Compact size="small">
                                                <Button
                                                    onClick={() => {
                                                        decline();
                                                    }}
                                                    icon={<MinusOutlined />}
                                                />
                                                <InputNumber min={1} max={100000} value={e.quantity} />

                                                <Button
                                                    onClick={() => {
                                                        increase();
                                                    }}
                                                    icon={<PlusOutlined />}
                                                />
                                            </Space.Compact>
                                        </Space>
                                    </Col>
                                    <Col span={6}>
                                        {e.discountRate != null ? (
                                            <p style={{ textDecoration: 'line-through', color: 'red' }}>
                                                {ChangeCurrence(e?.priceBeforeDiscount)}
                                            </p>
                                        ) : (
                                            ''
                                        )}
                                        <p>{ChangeCurrence(e?.total)}</p>
                                    </Col>
                                    <Col span={2}>
                                        <Avatar
                                            onClick={() => {
                                                showModal(e);
                                            }}
                                            style={{ cursor: 'pointer', position: 'absolute', top: 10, right: 0 }}
                                            shape="square"
                                            icon={<DeleteOutlined />}
                                        ></Avatar>
                                    </Col>
                                </Row>
                            </Card>
                        ))
                    )}
                </Col>
                <Col className="gutter-row" span={8} xs={24} md={8} lg={8} xl={8}>
                    <Descriptions title="Order infomation" bordered column={1}>
                        <Descriptions.Item label="Total price ">
                            {ChangeCurrence(cart.totalPriceBeforeDiscount)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total Discount">
                            {ChangeCurrence(cart.totalDiscount)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Total payment">{ChangeCurrence(cart.totalPrice)}</Descriptions.Item>
                    </Descriptions>
                    <Link to={`/purchase`}>
                        <Button size="large" block type="primary" style={{ marginTop: 10 }}>
                            Purchase now!
                        </Button>
                    </Link>
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
export default Cart;
