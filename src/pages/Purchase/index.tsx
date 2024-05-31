import type { Address, PaymentMethod } from '@/api/ResType';
import { useAppSelector } from '@/app/hooks';
import {
    Button,
    Divider,
    Select,
    Card,
    Col,
    Descriptions,
    Modal,
    Row,
    Space,
    Typography,
    Drawer,
    Radio,
    Flex,
} from 'antd';
import { Link } from 'react-router-dom';
import React, { Suspense, lazy, useEffect } from 'react';
import type { RadioChangeEvent, SelectProps } from 'antd';
import type { DescriptionsProps } from 'antd';
import * as userServices from '@/api/userServices';
import * as orderServices from '@/api/orderServices';
import * as paymentServices from '@/api/paymentServices';
import { useNavigate } from 'react-router-dom';
const AddressForm = lazy(()=> import('@/conponents/AddressForm'));
import { StatusForm } from '@/type';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { selectCartDetail } from '@/app/feature/cart/reducer';
import { selectUser } from '@/app/feature/user/reducer';
import { useQuery } from '@tanstack/react-query';
import Container from '@/conponents/Container';
const { Title, Paragraph } = Typography;
export type TypeFormAddress = 'ADD' | 'EDIT';
function Purchase() {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const user = useAppSelector(selectUser).data;
    const navigate = useNavigate();
    const cart = useAppSelector(selectCartDetail).data;
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const options: SelectProps['options'] = [];
    const [currentAddress, setCurrentAddress] = React.useState<Address>();
    const [currentAddressForm, setCurrentAddressForm] = React.useState<Address>();
    const [type, setType] = React.useState<string>('Chọn phương thức thanh toán');
    const [open, setOpen] = React.useState(false);
    const [openDrawAddress, setOpenDrawAddress] = React.useState(false);
    const [typeFormAddress, setTypeFormAddress] = React.useState<TypeFormAddress>('EDIT');
    const { data: listPaymentMethod } = useQuery({
        queryKey: [`type-payment-method`],
        queryFn: () => paymentServices.getPaymentMethodByUserId(user !== undefined ? user.id : ''),
        enabled: !!user,
    });
    const { data: addresses ,refetch} = useQuery({
        queryKey: [`list-addresses`],
        queryFn: () => userServices.getAddressByUserId(user !== undefined ? user.id : ''),
        enabled: !!user,
    });
    if (listPaymentMethod) {
        listPaymentMethod.map((e: PaymentMethod) => {
            options.push({
                value: e.id.toString(),
                label: e.name,
            });
        });
    }
    const showDrawerAddress = () => {
        setOpenDrawAddress(true);
    };
    const onCloseDrawAddress = () => {
        setOpenDrawAddress(false);
    };
    const handleChange = (value: string) => {
        setType(value);
    };
    useEffect(()=>{
        if(status != 'loading') refetch()
    },[status,refetch])
    useEffect(() => {
        if (addresses && addresses.length > 0) {
            setCurrentAddress(addresses[0]);
        }
    }, [addresses]);
    const handleCancel = () => {
        setOpen(false);
    };
    const handleChangeAddresses = (e: RadioChangeEvent) => {
        if (addresses !== undefined) {
            setCurrentAddress(addresses.find((x) => x.id == Number(e.target.value)));
        }
    };
    const createOrder = async () => {
        if (user != undefined && currentAddress != undefined && type != 'Chọn phương thức thanh toán') {
            const res = await orderServices.create(user.id, currentAddress.id, Number(type));
            if (res.isSuccessed === true) {
                if (res.resultObj?.paymentTypeName === 'Thanh toán VNPAY') {
                    window.location.assign(res.resultObj.returnUrl);
                } else {
                    navigate(`/checkout/${res.resultObj.orderId}`);
                }
            }
        }
    };
    let items: DescriptionsProps['items'] = [
        {
            key: 'phoneNumber',
            label: 'Số Điện Thoại',
            children: `${currentAddress?.phoneNumber}`,
        },
        {
            key: 'address',
            label: 'Địa chỉ',
            children: `${currentAddress?.streetNumber + ', ' + currentAddress?.wardCommune + ', ' + currentAddress?.urbanDistrict + ', ' + currentAddress?.province}`,
        },
    ];
    if (typeof currentAddress === 'undefined') {
        items = [];
    }
    return (
        <Container>
            <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
                <Col className="gutter-row" xs={24} lg={16} xl={16}>
                    <Title level={4}>Phương Thức Thanh Toán</Title>
                    <Select
                        size={'middle'}
                        value={type}
                        onChange={handleChange}
                        style={{ width: '100%', marginBottom: 10 }}
                        options={options}
                    />
                    {cart.items.map((e) => (
                        <Card key={e.id} size="small" style={{ width: '100%', marginBottom: 10 }}>
                            <Row gutter={[0, 8]}>
                                <Col className="gutter-row" span={6}>
                                    <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: '100%' }} />
                                </Col>
                                <Col className="gutter-row" span={18}>
                                    <Flex justify="space-between" align="center">
                                        <Paragraph
                                            ellipsis={{
                                                rows: 1,
                                            }}
                                        >
                                            <Link to={`/product/detail/${e.productId}`}>{e.seoTitle}</Link>
                                        </Paragraph>
                                    </Flex>
                                    <Flex justify="space-between" align="center" wrap="wrap-reverse">
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
                                                            {ChangeCurrence(e?.priceBeforeDiscount * e?.quantity)}
                                                        </p>
                                                    )}
                                                </>
                                            </Space>
                                        </div>
                                    </Flex>
                                </Col>
                            </Row>
                        </Card>
                    ))}
                </Col>
                <Col className="gutter-row" span={8} xs={24} lg={8} xl={8}>
                    <Descriptions
                        title="Thông Tin Địa Chỉ"
                        column={1}
                        items={items}
                        style={{ marginTop: 10 }}
                        bordered
                        extra={
                            typeof currentAddress !== 'undefined' ? (
                                <Button
                                    type="primary"
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        showDrawerAddress();
                                    }}
                                ></Button>
                            ) : (
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setCurrentAddressForm(undefined);
                                        setTypeFormAddress('ADD');
                                        setOpen(true);
                                    }}
                                >
                                    Thêm Địa Chỉ
                                </Button>
                            )
                        }
                    />
                    <Descriptions title="Chi Tiết Đơn Hàng" bordered column={1}>
                        <Descriptions.Item label="Giá Sản Phẩm">
                            {ChangeCurrence(cart.totalPriceBeforeDiscount)}
                        </Descriptions.Item>
                        <Descriptions.Item label="Giá Giảm">{ChangeCurrence(cart.totalDiscount)}</Descriptions.Item>
                        <Descriptions.Item style={{ color: 'red' }} label="Giá Thanh Toán">
                            {ChangeCurrence(cart.totalPrice)}
                        </Descriptions.Item>
                    </Descriptions>
                    <Button
                        size="large"
                        block
                        type="primary"
                        style={{ marginBottom: 10 ,marginTop:10}}
                        disabled={
                            cart.items.length <= 0 ||
                            cart.items.some((s) => s.stock == 0 || s.stock < s.quantity || currentAddress == undefined) ||
                            type === "Chọn phương thức thanh toán"
                        }
                        onClick={() => {
                            createOrder();
                        }}
                    >
                        Thanh Toán Ngay
                    </Button>
                </Col>
            </Row>
            <Modal title="Notification" open={open} onCancel={handleCancel} footer={''}>
                <Suspense>
                    <AddressForm
                        typeForm={typeFormAddress}
                        address={currentAddressForm}
                        onSetState={setCurrentAddress}
                        onSetStatus={setStatus}
                    />
                </Suspense>
            </Modal>
            <Drawer title="Sửa Địa Chỉ" onClose={onCloseDrawAddress} open={openDrawAddress}>
                <Radio.Group value={currentAddress?.id} onChange={handleChangeAddresses}>
                    <Space direction="vertical">
                        {addresses && addresses.map((e: Address) => (
                            <Space>
                                <Radio key={e?.id} value={e?.id}>
                                    <p>{e?.phoneNumber}</p>
                                    <p>
                                        {e?.streetNumber +
                                            ', ' +
                                            e?.wardCommune +
                                            ', ' +
                                            e?.urbanDistrict +
                                            ', ' +
                                            e?.province}
                                    </p>
                                    <Divider />
                                </Radio>
                                <Button
                                    icon={<EditOutlined />}
                                    onClick={() => {
                                        setCurrentAddressForm(e);
                                        setTypeFormAddress('EDIT');
                                        setOpen(true);
                                    }}
                                ></Button>
                            </Space>
                        ))}
                    </Space>
                </Radio.Group>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    shape="round"
                    size="large"
                    onClick={() => {
                        setCurrentAddressForm(undefined);
                        setTypeFormAddress('ADD');
                        setOpen(true);
                    }}
                ></Button>
            </Drawer>
        </Container>
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
