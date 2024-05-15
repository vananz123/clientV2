import type { Cart } from '@/api/ResType';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart, selectCart } from '@/feature/cart/cartSlice';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Alert,
    Avatar,
    Button,
    Card,
    Col,
    Descriptions,
    Empty,
    InputNumber,
    Modal,
    Row,
    Space,
    Spin,
} from 'antd';
import React from 'react';

import * as cartServices from '@/api/cartServices';
import { Link } from 'react-router-dom';
function Cart() {
    const baseUrl =import.meta.env.VITE_BASE_URL
    const dispatch = useAppDispatch();
    const cart = useAppSelector(selectCart);
    const [currentCart, setCurrentCart] = React.useState<Cart>();
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [loadingHandleQuantity, setLoadingHandleQuantity] = React.useState(false);
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
        }, 200);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    const increase = async (e: Cart) => {
        if (typeof e !== 'undefined') {
            const newQuantity = e?.quantity + 1;
            if(newQuantity <= e?.stock){
                setLoadingHandleQuantity(true);
                setTimeout(async () => {
                    const res = await cartServices.updateCart(e?.id, newQuantity);
                    if (res.isSuccessed == true) {
                        dispatch(addToCart(res.resultObj));
                        setLoadingHandleQuantity(false)
                    }else{
                        setLoadingHandleQuantity(false)
                    }
                }, 200);
            }
        }
    };
    const decline = async (e: Cart) => {
        if (typeof e !== 'undefined' && e.quantity > 0) {
            setLoadingHandleQuantity(true);
            const newQuantity = e?.quantity - 1;
            setTimeout(async () => {
                const res = await cartServices.updateCart(e?.id, newQuantity);
                if (res.isSuccessed == true) {
                    dispatch(addToCart(res.resultObj));
                    setLoadingHandleQuantity(false)
                }else{
                    setLoadingHandleQuantity(false)
                }
            }, 200);
            
        }
    };
    return (
        <div>
            <Spin spinning={loadingHandleQuantity}>
                <Row gutter={24}>
                    <Col className="gutter-row" span={16} xs={24} md={16} lg={16} xl={16}>
                        {cart.items.length == 0 ? (
                            <>
                                <Empty
                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                    imageStyle={{ height: 60 }}
                                >
                                    <Link to={'/product/all'}>
                                        <Button type="primary">Mua Hàng Ngay!</Button>
                                    </Link>
                                </Empty>
                            </>
                        ) : (
                            cart.items.map((e) => (
                                <Card key={e.id} style={{ width: '100%', marginBottom: 10 }}>
                                    <Row gutter={[8, 8]}>
                                        <Col className="gutter-row" span={5}>
                                            <h3>Sản Phẩm</h3>
                                            <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: '100%' }} />
                                        </Col>
                                        <Col className="gutter-row" span={5}>
                                            <h3>Tên Sản Phẩm</h3>
                                            <Link to={`/product/detail/${e.productId}`}>{e.seoTitle}</Link>
                                        </Col>
                                        <Col className="gutter-row" span={2}>
                                            <h3>Kích Cỡ</h3>
                                            <p>
                                                {e?.name}: {e?.value}
                                            </p>
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                            <h3>Số Lượng</h3>
                                            {e.stock == 0? <Alert type='error' message="Product out of stock! Please delete proudct"/>: ''}
                                            {e.stock < e.quantity ? <Alert type='error' message="Product kh đủ!"/>: ''}
                                            <Space.Compact size='small'>
                                                <Button
                                                    onClick={() => {
                                                    decline(e);
                                                    }}
                                                    icon={ <MinusOutlined />}
                                                />
                                                    <InputNumber min={1} max={e?.stock} style={{width:70}} value={e.quantity} />
    
                                                    <Button
                                                        onClick={() => {
                                                            increase(e);
                                                        }}
                                                        icon={<PlusOutlined />}
                                                    />
                                                </Space.Compact>
                                        </Col>
                                        <Col span={5}>
                                            <h3>Tổng Giá</h3>
                                            {e.valuePromotion != null ? (
                                                <p style={{ textDecoration: 'line-through'}}>
                                                    {ChangeCurrence(e?.priceBeforeDiscount* e?.quantity)}
                                                </p>
                                            ) : (
                                                ''
                                            )}
                                            <p style={{ fontWeight:500, color: 'red' }}>{ChangeCurrence(e?.total)}</p>
                                        </Col>
                                        <Col span={2}>
                                            <h3>Xóa</h3>
                                            <Avatar
                                                onClick={() => {
                                                    showModal(e);
                                                }}
                                                style={{ cursor: 'pointer', top: 10, right: 0, backgroundColor:'red' }}
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
                        <Descriptions title="Thông Tin Sản Phẩm" bordered column={1}>
                            <Descriptions.Item label="Giá Sản Phẩm ">
                                {ChangeCurrence(cart.totalPriceBeforeDiscount)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giá Giảm">
                                {ChangeCurrence(cart.totalDiscount)}
                            </Descriptions.Item>
                            <Descriptions.Item style={{color:'red'}} label="Giá Thanh Toán">{ChangeCurrence(cart.totalPrice)}</Descriptions.Item>
                        </Descriptions>
                        <Link to={`/purchase`}>
                            <Button size="large" block type="primary" disabled={cart.items.length <=0 || cart.items.some(s=> s.stock ==0 || s.stock < s.quantity)} style={{ marginTop: 10 }}>
                                Thanh Toán Ngay
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Spin>
            <Modal
                title="Notification"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
               Do you want to detele!
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
