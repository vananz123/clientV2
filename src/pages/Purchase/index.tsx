import type { Address, Cart, PaymentMethod, Shipping } from '@/api/ResType';
import { useAppSelector } from '@/app/hooks';
import {
    Button,
    Divider,
    Select,
    Col,
    Descriptions,
    Modal,
    Row,
    Space,
    Typography,
    Drawer,
    Radio,
    InputNumber,
} from 'antd';
import { Link } from 'react-router-dom';
import React, { Suspense, lazy, useEffect } from 'react';
import type { RadioChangeEvent, SelectProps } from 'antd';
import type { DescriptionsProps } from 'antd';
import * as userServices from '@/api/userServices';
import * as orderServices from '@/api/orderServices';
import * as paymentServices from '@/api/paymentServices';
import * as departmentServices from '@/api/departmentServices';
import { useNavigate } from 'react-router-dom';
const AddressForm = lazy(() => import('@/conponents/AddressForm'));
import { Department, StatusForm } from '@/type';
import { EditOutlined, PlusOutlined, ArrowLeftOutlined, GoogleOutlined } from '@ant-design/icons';
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
    const optionsShipping: SelectProps['options'] = [];
    const optionsDepartment: SelectProps['options'] = [];
    const [currentAddress, setCurrentAddress] = React.useState<Address>();
    const [currentAddressForm, setCurrentAddressForm] = React.useState<Address>();
    const [type, setType] = React.useState<string>('Chọn phương thức thanh toán');
    const [typeShipping, setTypeShipping] = React.useState<string>('Chọn phương thức nhận hàng');
    const [currentDepartmentId, setCurrentDepartmentId] = React.useState<string>();
    const [open, setOpen] = React.useState(false);
    const [openDrawAddress, setOpenDrawAddress] = React.useState(false);
    const [typeFormAddress, setTypeFormAddress] = React.useState<TypeFormAddress>('EDIT');
    const { data: listPaymentMethod } = useQuery({
        queryKey: [`type-payment-method`],
        queryFn: () => paymentServices.getPaymentMethodByUserId(user !== undefined ? user.id : ''),
        enabled: !!user,
    });
    const { data: addresses, refetch } = useQuery({
        queryKey: [`list-addresses`],
        queryFn: () => userServices.getAddressByUserId(user !== undefined ? user.id : ''),
        enabled: !!user,
    });
    const { data: listShippingMethod } = useQuery({
        queryKey: [`list-shipping`],
        queryFn: () => orderServices.shippingGetAll(),
    });
    const { data: listDepartment } = useQuery({
        queryKey: [`list-department`],
        queryFn: () => departmentServices.getAllDepartment(),
    });
    if (listPaymentMethod) {
        listPaymentMethod.map((e: PaymentMethod) => {
            options.push({
                value: e.id.toString(),
                label: e.name,
            });
        });
    }
    if (listShippingMethod) {
        listShippingMethod.map((e: Shipping) => {
            optionsShipping.push({
                value: e.id.toString(),
                label: e.name,
            });
        });
    }

    if (listDepartment) {
        listDepartment.map((e: Department) => {
            optionsDepartment.push({
                value: e.id.toString(),
                label: e.name,
            });
        });
    }
    const checkStock = (id: number, inventory: Cart[] | undefined) => {
        let a = true;
        if (inventory) {
            inventory.forEach((e: Cart) =>
                e.inventories.forEach((element) => {
                    if (element.departmentId === id) {
                        if (Number(element.stock) >= Number(e.quantity)) {
                            a = false;
                        }
                    }
                }),
            );
        }
        return a;
    };
    console.log(checkStock(1, cart.items));
    console.log(cart.items);
    const showDrawerAddress = () => {
        setOpenDrawAddress(true);
    };
    const onCloseDrawAddress = () => {
        setOpenDrawAddress(false);
    };
    const handleChange = (value: string) => {
        setType(value);
    };
    const handleChangeShip = (value: string) => {
        setTypeShipping(value);
    };
    useEffect(() => {
        if (status != 'loading') refetch();
    }, [status, refetch]);
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
    const handleChangeDepartment = (e: RadioChangeEvent) => {
        if (listDepartment !== undefined) {
            setCurrentDepartmentId(e.target.value);
        }
    };
    console.log(listDepartment);
    console.log(currentDepartmentId);
    const createOrder = async () => {
        if (user != undefined && currentAddress != undefined && type != 'Chọn phương thức thanh toán') {
            const res = await orderServices.create(
                user.id,
                currentAddress.id,
                Number(type),
                Number(typeShipping),
                currentDepartmentId ? Number(currentDepartmentId) : 0,
            );
            console.log(res)
            if (res.isSuccessed === true) {
                if (res.resultObj?.paymentTypeName === 'Thanh toán VNPAY') {
                    window.location.assign(res.resultObj.returnUrl);
                } else {
                    navigate(`/checkout/${res.resultObj.orderId}`);
                }
            }
        }
    };
    console.log(listDepartment);
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
    let time = new Date();
    return (
        <Container>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="large"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    navigate(-1);
                }}
            >
                Trở lại
            </Button>
            <Row gutter={[24, 24]} className="mb-5 p-5">
                <Col className="gutter-row" xs={24} lg={14} xl={14}>
                    <Col className="gutter-row" xs={24} lg={20} xl={20}>
                        <div className="mb-5">
                            <Title level={4}>Phương Thức Nhận Hàng</Title>
                            <Select
                                size={'middle'}
                                value={typeShipping}
                                onChange={handleChangeShip}
                                style={{ width: '100%', marginBottom: 10 }}
                                options={optionsShipping}
                            />
                            <Radio.Group onChange={handleChangeDepartment}>
                                {typeShipping &&
                                    typeShipping === '2' &&
                                    listDepartment &&
                                    listDepartment.map((e) => (
                                        <Radio value={e.id} disabled={checkStock(e.id, cart.items)}>
                                            <div className="flex">
                                                <div className="m-2">
                                                    <p>{e.address}</p>
                                                    <a className="text-blue-700" href={e.linkGoogleMap} target="_blank">
                                                        <GoogleOutlined /> Chỉ đường
                                                    </a>
                                                </div>
                                            </div>
                                        </Radio>
                                    ))}
                            </Radio.Group>
                        </div>
                        <div>
                            <Title level={4}>Phương Thức Thanh Toán</Title>
                            <Select
                                size={'middle'}
                                value={type}
                                onChange={handleChange}
                                style={{ width: '100%', marginBottom: 10 }}
                                options={options}
                            />
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
                        </div>
                    </Col>
                </Col>
                <Col className="gutter-row" span={8} xs={24} lg={8} xl={8}>
                    {cart.items.map((e) => (
                        <div className="rounded bg-[#fafafa] ">
                            <Title level={5}>Sản phẩm trong đơn</Title>
                            <div className="flex justify-between">
                                <div className="w-full">
                                    <Paragraph
                                        ellipsis={{
                                            rows: 1,
                                        }}
                                    >
                                        <Link to={`/product/detail/${e.productId}`}>{e.seoTitle}</Link>
                                    </Paragraph>
                                </div>
                            </div>
                            <Row gutter={[8, 0]}>
                                <Col className="gutter-row" span={6}>
                                    <div className="w-full h-full bg-white rounded">
                                        <img className="w-full" src={`${baseUrl + e.urlThumbnailImage}`} />
                                    </div>
                                </Col>
                                <Col className="gutter-row" span={18}>
                                    <div className="w-full h-full sm:p-2">
                                        <div className="h-full flex flex-col justify-between">
                                            <div className="w-full">
                                                {e?.type == undefined ? (
                                                    <div className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                                                        <span>{ChangeCurrence(e?.priceBeforeDiscount)}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-row">
                                                        <div>
                                                            <span className="text-[14px] sm:text-[16px] text-red-500 font-medium mr-[5px]">
                                                                {ChangeCurrence(e?.price)}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] sm:text-[12px] text-[#6D6E72] font-medium mr-[5px] line-through">
                                                                {ChangeCurrence(e?.priceBeforeDiscount)}
                                                            </span>
                                                            {e.type === 'fixed' ? (
                                                                <span className="pro-percent">
                                                                    {' '}
                                                                    -{e.valuePromotion}
                                                                </span>
                                                            ) : (
                                                                <span className="text-[#E30019] text-[10px] sm:text-[12px] text-center rounded border-[1px] border-[#E30019] px-1">
                                                                    -{e.valuePromotion}%
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex justify-start gap-4 mt-2">
                                                    <p>{}</p>
                                                    <p>
                                                        {e?.name}: {e?.value} {e.sku}
                                                    </p>
                                                    <div>
                                                        <InputNumber
                                                            size="small"
                                                            disabled
                                                            style={{ width: 50 }}
                                                            value={e.quantity}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ))}
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
                        danger
                        style={{ marginBottom: 10, marginTop: 10 }}
                        disabled={
                            cart.items.length <= 0 ||
                            cart.items.some(
                                (s) => s.stock == 0 || s.stock < s.quantity || currentAddress == undefined,
                            ) ||
                            type === 'Chọn phương thức thanh toán' ||
                            typeShipping === 'Chọn phương thức nhận hàng'
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
                        {addresses &&
                            addresses.map((e: Address) => (
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
            <div className="p-5">
                <div className="flex justify-start my-3">
                    <p className="text-[18px] font-bold">Hệ thống cửa hàng</p>
                </div>
                {typeof listDepartment !== 'undefined' && (
                    <Row gutter={[16, 16]}>
                        {listDepartment.length > 0 && (
                            <>
                                {listDepartment.map((e) => (
                                    <Col className="gutter-row" xs={24} lg={6} xl={6} key={e.id}>
                                        <div className="mt-4 grid grid-cols-1 tablet:grid-cols-2 gap-2">
                                            <div className="flex p-2">
                                                <div className="m-2">
                                                    <p className="font-medium mb-1">{e.province}</p>
                                                    <p>{e.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-end justify-between">
                                                <div className="ml-4">
                                                    {time.getHours() >= 9 && time.getHours() <= 21 ? (
                                                        <div>
                                                            <span className="text-[#3bb346] font-medium">Mở cửa</span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="text-[#f93920] font-medium">Đóng cửa</span>
                                                        </div>
                                                    )}
                                                    <span>09:00-21:00</span>
                                                </div>
                                                <div className="font-semibold flex items-center">
                                                    <a className="text-blue-700" href={e.linkGoogleMap} target="_blank">
                                                        <GoogleOutlined /> Chỉ đường
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </>
                        )}
                    </Row>
                )}
            </div>
        </Container>
    );
}
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formattedNumber;
    }
    return 0;
};
export default Purchase;
