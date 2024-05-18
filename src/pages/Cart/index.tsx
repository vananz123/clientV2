import type { Cart } from '@/api/ResType';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart, selectCart } from '@/feature/cart/cartSlice';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import {
    Typography,
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
    Flex,
} from 'antd';
import React from 'react';
const { Paragraph } = Typography;
import * as cartServices from '@/api/cartServices';
import { Link } from 'react-router-dom';
function Cart() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
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
            if (newQuantity <= e?.stock) {
                setLoadingHandleQuantity(true);
                setTimeout(async () => {
                    const res = await cartServices.updateCart(e?.id, newQuantity);
                    if (res.isSuccessed == true) {
                        dispatch(addToCart(res.resultObj));
                        setLoadingHandleQuantity(false);
                    } else {
                        setLoadingHandleQuantity(false);
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
                    setLoadingHandleQuantity(false);
                } else {
                    setLoadingHandleQuantity(false);
                }
            }, 200);
        }
    };
    return (
        <div className="container" style={{marginTop:16}}>
            <Spin spinning={loadingHandleQuantity}>
                <Row gutter={24}>
                    <Col className="gutter-row" xs={24} md={24} lg={16} xl={16}>
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
                                <Card key={e.id} size='small' style={{ width: '100%', marginBottom: 10 }}>
                                    <Row gutter={[0, 8]}>
                                        <Col className="gutter-row" xs={8} lg={6}>
                                            <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: '100%' }} />
                                        </Col>
                                        <Col className="gutter-row" xs={16} lg={18}>
                                            <Flex justify="space-between" align="center">
                                                <Paragraph
                                                    ellipsis={{
                                                        rows: 1,
                                                    }}
                                                >
                                                    <Link to={`/product/detail/${e.productId}`}>{e.seoTitle}</Link>
                                                </Paragraph>
                                                <div>
                                                    <Avatar
                                                        onClick={() => {
                                                            showModal(e);
                                                        }}
                                                        style={{ cursor: 'pointer', backgroundColor: 'red'}}
                                                        shape="square"
                                                        icon={<DeleteOutlined />}
                                                    ></Avatar>
                                                </div>
                                            </Flex>
                                            <Flex justify="space-between" align="center" wrap="wrap-reverse">
                                                <div>
                                                    <Space.Compact size="small">
                                                        <Button
                                                            onClick={() => {
                                                                decline(e);
                                                            }}
                                                            icon={<MinusOutlined />}
                                                        />
                                                        <InputNumber
                                                            min={1}
                                                            max={e?.stock}
                                                            style={{ width: 50 }}
                                                            value={e.quantity}
                                                        />

                                                        <Button
                                                            onClick={() => {
                                                                increase(e);
                                                            }}
                                                            icon={<PlusOutlined />}
                                                        />
                                                    </Space.Compact>
                                                </div>
                                                <p>
                                                    {e?.name}: {e?.value}
                                                </p>
                                                <div>
                                                    <Space>
                                                        <>
                                                            <p style={{ fontWeight: 500, color: 'red' }}>
                                                                {ChangeCurrence(e?.total)}
                                                            </p>
                                                            {e.valuePromotion != null && (
                                                                <p style={{ textDecoration: 'line-through' }}>
                                                                    {ChangeCurrence(
                                                                        e?.priceBeforeDiscount * e?.quantity,
                                                                    )}
                                                                </p>
                                                            )}
                                                        </>
                                                    </Space>
                                                </div>
                                                {e.stock == 0 && (
                                                    <Alert
                                                        type="error"
                                                        message="Product out of stock! Please delete proudct"
                                                    />
                                                )}
                                                {e.stock < e.quantity && (
                                                    <Alert type="error" message="Product kh đủ!" />
                                                )}
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Card>
                            ))
                        )}
                    </Col>
                    <Col className="gutter-row"  xs={24} md={24} lg={8} xl={8}>
                        <Descriptions title="Thông Tin Sản Phẩm" bordered column={1}>
                            <Descriptions.Item label="Giá Sản Phẩm ">
                                {ChangeCurrence(cart.totalPriceBeforeDiscount)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Giá Giảm">{ChangeCurrence(cart.totalDiscount)}</Descriptions.Item>
                            <Descriptions.Item style={{ color: 'red' }} label="Giá Thanh Toán">
                                {ChangeCurrence(cart.totalPrice)}
                            </Descriptions.Item>
                        </Descriptions>
                        <Link to={`/purchase`}>
                            <Button
                                size="large"
                                block
                                type="primary"
                                disabled={
                                    cart.items.length <= 0 ||
                                    cart.items.some((s) => s.stock == 0 || s.stock < s.quantity)
                                }
                                style={{ marginTop: 10 }}
                            >
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
