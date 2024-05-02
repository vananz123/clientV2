import { ArrowDownOutlined, ArrowLeftOutlined, DollarOutlined, MinusOutlined } from '@ant-design/icons';
import {
    Badge,
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Drawer,
    Flex,
    Form,
    FormProps,
    Input,
    Modal,
    Radio,
    Rate,
    Result,
    Row,
    Skeleton,
    Space,
} from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import * as userServices from '@/api/userServices';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/feature/user/userSlice';
import { Address, Cart, Order, Review } from '@/api/ResType';
import { Tabs } from 'antd';
import type { DescriptionsProps, RadioChangeEvent, TabsProps } from 'antd';
import { TypeFormAddress } from '../Purchase';
import AddressForm from '@/conponents/AddressForm';
import { StatusForm } from '../Admin/Category/Type';
function Profile() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const [form] = Form.useForm();
    const [data, setData] = React.useState<Order[]>();
    const [currentData, setCurrentData] = React.useState<Order>();
    const [addresses, setAddresses] = React.useState<Address[]>([]);
    const [currentAddress, setCurrentAddress] = React.useState<Address>();
    const [currentAddressForm, setCurrentAddressForm] = React.useState<Address>();
    const [open, setOpen] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want to detele!');
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [typeFormAddress, setTypeFormAddress] = React.useState<TypeFormAddress>('EDIT');
    const getAllPurchase = async () => {
        if (user != undefined) {
            const res = await orderServices.getOrderByUserId(user?.id);
            console.log(res);
            if (res.statusCode == 200) {
                const arrSort: Order[] = res.resultObj.items.sort((a: Order, b: Order) => {
                    let aa = new Date(a.orderDate).getTime();
                    let bb = new Date(b.orderDate).getTime();
                    return bb - aa;
                });
                setData(arrSort);
            }
        }
    };
    const getAddress = async () => {
        if (user != undefined) {
            const res = await userServices.getAddressByUserId(user.id);
            if (res.isSuccessed == true) {
                setAddresses(res.resultObj);
            }
        }
    };
    useEffect(() => {
        getAllPurchase();
        getAddress();
        if (status != 'loading') {
            setOpen(false);
        }
    }, [status]);
    const GoBack = () => {
        Navigate(-1);
    };

    const onChange = (key: string) => {
        console.log(key);
    };
    const desUser: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Name',
            children: <p>{user?.fullName}</p>,
            span: 2,
        },
        {
            key: '2',
            label: 'Email',
            children: <p>{user?.email}</p>,
        },
        {
            key: '3',
            label: 'Phone number',
            children: <p>{user?.phoneNumber}</p>,
        },
    ];
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'List purchase',
            children: (
                <>
                    {typeof data !== 'undefined' ? (
                        data.map((e: Order, index) => (
                            <>
                                <Row align={'middle'} style={{ padding: 10 }}>
                                    <Col span={6}>
                                        <Space wrap>
                                            <p>Thành tiền: {ChangeCurrence(e.orderTotal)}</p>
                                            <p>{new Date(e.orderDate).toUTCString()}</p>
                                        </Space>
                                    </Col>
                                    <Col span={6}>
                                        <p>{e.paymentMethod?.paymentType}</p>
                                        <Badge status="processing" text={e.status?.pop()?.name} />
                                    </Col>
                                    <Col span={10} xs={24} lg={10}>
                                        <Link to={`/profile/order-detail/${e.id}`}>
                                            <Button>Detail</Button>
                                        </Link>
                                    </Col>
                                </Row>
                                <Divider />
                            </>
                        ))
                    ) : (
                        <Result
                            title="You don't have order!"
                            extra={
                                <Button
                                    type="primary"
                                    key="console"
                                    onClick={() => {
                                        Navigate('/product/all');
                                    }}
                                >
                                    Go Purchase
                                </Button>
                            }
                        />
                    )}
                </>
            ),
        },
        {
            key: '2',
            label: 'User info',
            children: (
                <>
                    <Row gutter={16}>
                        <Col span={14}>
                            <Descriptions size="middle" items={desUser} bordered />
                        </Col>
                        <Col span={10}>
                            <div>
                                <Space direction='vertical'>
                                    {addresses.map((e: Address) => (
                                        <>
                                            <Flex align='center' justify='space-between'>
                                                <Space>
                                                    <div>
                                                        <p>{e?.phoneNumber}</p>
                                                        <p>
                                                            {e?.streetNumber +
                                                                ', ' +
                                                                e?.wardCommune +
                                                                ', ' +
                                                                e?.urbanDistrict +
                                                                ', ' +
                                                                e?.city}
                                                        </p>
                                                    </div>
                                                </Space>
                                                <Space direction="vertical">
                                                    <Button
                                                        onClick={() => {
                                                            setCurrentAddressForm(e);
                                                            setTypeFormAddress('EDIT');
                                                            setOpen(true);
                                                        }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setCurrentAddressForm(e);
                                                            setOpenDel(true);
                                                            
                                                        }}
                                                    >
                                                        Del
                                                    </Button>
                                                </Space>
                                            </Flex>
                                        </>
                                    ))}
                                </Space>
                                <Button
                                    type="primary"
                                    block
                                    onClick={() => {
                                        setCurrentAddressForm(undefined);
                                        setTypeFormAddress('ADD');
                                        setOpen(true);
                                    }}
                                >
                                    Add
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </>
            ),
        },
    ];
    const handleDelOk = () => {
        setConfirmLoading(true);
        setTimeout(async() => {
            if(typeof currentAddress !== 'undefined'){
                const res = await userServices.deleteAddress(currentAddress?.id)
                if(res.isSuccessed ===true){
                    getAddress()
                    setConfirmLoading(false)
                    setOpenDel(false)
                }
            }
            setConfirmLoading(false)
            setOpenDel(false)
            
        }, 200);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    GoBack();
                }}
            >
                Go back
            </Button>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <Modal
                title="Notification"
                open={open}
                //onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                footer={''}
            >
                <AddressForm
                    typeForm={typeFormAddress}
                    address={currentAddressForm}
                    onSetState={setCurrentAddress}
                    onSetStatus={setStatus}
                />
            </Modal>
            <Modal
                title="Notification"
                open={openDel}
                onOk={handleDelOk}
                confirmLoading={confirmLoading}
                onCancel={()=>{setOpenDel(false)}}
            >
                {modalText}
            </Modal>
        </div>
    );
}
const ChangeCurrence = (number: number | undefined) => {
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
export default Profile;
