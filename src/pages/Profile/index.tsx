import {ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {
    Badge,
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Flex,
    Modal,
    Result,
    Row,
    Space,
} from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import * as userServices from '@/api/userServices';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/feature/user/userSlice';
import { Address, Order } from '@/api/ResType';
import { Tabs } from 'antd';
import type { DescriptionsProps, TabsProps } from 'antd';

import { TypeFormAddress } from '../Purchase';
import AddressForm from '@/conponents/AddressForm';
import { StatusForm } from '../Admin/Category/Type';
import dayjs from 'dayjs';
function Profile() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser);
    //const [form] = Form.useForm();
    const [data, setData] = React.useState<Order[]>();
    //const [currentData, setCurrentData] = React.useState<Order>();
    const [addresses, setAddresses] = React.useState<Address[]>([]);
    const [currentAddress, setCurrentAddress] = React.useState<Address>();
    const [currentAddressForm, setCurrentAddressForm] = React.useState<Address>();
    const [open, setOpen] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [typeFormAddress, setTypeFormAddress] = React.useState<TypeFormAddress>('EDIT');
    const getAllPurchase = async () => {
        if (user != undefined) {
            const res = await orderServices.getOrderByUserId(user?.id);
            console.log(res);
            if (res.statusCode == 200) {
                setData(res.resultObj.items);
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
            label: 'Danh Sách Đơn Hàng',
            children: (
                <>
                    {typeof data !== 'undefined' ? (
                        data.map((e: Order) => (
                            <>
                                <Row key={e.id} align={'middle'} style={{ padding: 10}}>
                                    <Col style={{fontSize:17}} xs={24} md={10} lg={10}>
                                        <Space wrap>
                                            <p>Thành tiền: {ChangeCurrence(e.orderTotal)}</p>
                                            <em>{dayjs(e.orderDate).format('MM/DD/YYYY, HH:MM')}</em>
                                        </Space>
                                    </Col>
                                    <Col style={{fontSize:18}} xs={24} md={10} lg={10}>
                                        <Space>
                                            <p>Tình trạng: </p>
                                            <Badge status="processing" text={e.status?.pop()?.name} />
                                        </Space>
                                    </Col>
                                    <Col xs={24} md={10} lg={4}>
                                        <Link to={`/profile/order-detail/${e.id}`}>
                                            <Button style={{fontSize:17, backgroundColor:'#ff4d4f'}} >Xem</Button>
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
            label: 'Thông Tin Khách Hàng',
            children: (
                <>
                    <Row gutter={[24,8]}>
                        <Col xs={24} lg={14}>
                            <Descriptions title="Thông tin tài khoản" size="middle" items={desUser} bordered />
                        </Col>
                        <Col  xs={24} lg={10}>
                            <Card title="Thông tin địa chỉ">
                                <div>
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
                                                                e.province}
                                                        </p>
                                                    </div>
                                                </Space>
                                                <Space direction="vertical">
                                                    <Button
                                                    icon={<EditOutlined/>}
                                                        onClick={() => {
                                                            setCurrentAddressForm(e);
                                                            setTypeFormAddress('EDIT');
                                                            setOpen(true);
                                                        }}
                                                    >
                                                    </Button>
                                                    <Button
                                                    icon={<DeleteOutlined/>}
                                                        onClick={() => {
                                                            setCurrentAddress(e);
                                                            setOpenDel(true);
                                                            
                                                        }}
                                                    >
                                                    </Button>
                                                </Space>
                                            </Flex>
                                        </>
                                    ))}
                                </div>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined/>}
                                    shape="round"
                                    size='large'
                                    onClick={() => {
                                        setCurrentAddressForm(undefined);
                                        setTypeFormAddress('ADD');
                                        setOpen(true);
                                    }}
                                >
                                    
                                </Button>
                            </Card>
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
                Do you want to detele!
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
