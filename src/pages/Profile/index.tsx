import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Card, Col, Descriptions, Divider, Flex, Modal, Result, Row, Space, Tabs } from 'antd';
import React, {  useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import * as userServices from '@/api/userServices';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Address, Order, OrderStatus } from '@/api/ResType';
import type { DescriptionsProps, TabsProps } from 'antd';
import { TypeFormAddress } from '../Purchase';
import AddressForm from '@/conponents/AddressForm';
import { StatusForm } from '@/type';
import dayjs from 'dayjs';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProfileLoading from './ProfileLoading';
import Container from '@/conponents/Container';
function Profile() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser).data;
    const { data, isLoading } = useQuery({
        queryKey: ['order-list-user'],
        queryFn: () => orderServices.getOrderByUserId(user?.id || ''),
    });
    //const [currentData, setCurrentData] = React.useState<Order>();
    const [currentAddress, setCurrentAddress] = React.useState<Address>();
    const [currentAddressForm, setCurrentAddressForm] = React.useState<Address>();
    const [open, setOpen] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [typeFormAddress, setTypeFormAddress] = React.useState<TypeFormAddress>('EDIT');
    const { data: addresses ,refetch} = useQuery({
        queryKey: [`list-addresses`],
        queryFn: () => userServices.getAddressByUserId(user !== undefined ? user.id : ''),
        enabled: !!user,
    });
    const mutation = useMutation({
        mutationKey:['del-address'],
        mutationFn:(userId:number)=> userServices.deleteAddress(userId),
        onSuccess:()=>{
            refetch()
            setOpenDel(false);
        }   
    })
    useEffect(() => {
        if (status != 'loading') {
            refetch()
            setOpen(false);
        }
    }, [refetch, status]);
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
                    {data && data.length > 0 ? (
                        data.map((e: Order) => (
                            <>
                                <Row key={e.id} align={'middle'} style={{ padding: 10 }}>
                                    <Col style={{ fontSize: 17 }} xs={24} md={10} lg={10}>
                                        <Space wrap>
                                            <p>Thành tiền: {ChangeCurrence(e.orderTotal)}</p>
                                            <em>{dayjs(e.orderDate).format('MM/DD/YYYY, HH:MM')}</em>
                                        </Space>
                                    </Col>
                                    <Col style={{ fontSize: 18 }} xs={24} md={10} lg={10}>
                                        <Space>
                                            <p>Tình trạng: </p>
                                            <Badge status="processing" text={getLateArray(e.status)} />
                                        </Space>
                                    </Col>
                                    <Col xs={24} md={10} lg={4}>
                                        <Link to={`/profile/order-detail/${e.id}`}>
                                            <Button>Xem</Button>
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
                                        Navigate('/product/1');
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
                    <Row gutter={[24, 8]}>
                        <Col xs={24} lg={14}>
                            <Descriptions title="Thông tin tài khoản" size="middle" items={desUser} bordered />
                        </Col>
                        <Col xs={24} lg={10}>
                            <Card title="Thông tin địa chỉ">
                                <div>
                                    {addresses && addresses.map((e: Address) => (
                                        <>
                                            <Flex align="center" justify="space-between">
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
                                                        icon={<EditOutlined />}
                                                        onClick={() => {
                                                            setCurrentAddressForm(e);
                                                            setTypeFormAddress('EDIT');
                                                            setOpen(true);
                                                        }}
                                                    ></Button>
                                                    <Button
                                                        icon={<DeleteOutlined />}
                                                        onClick={() => {
                                                            setCurrentAddress(e);
                                                            setOpenDel(true);
                                                        }}
                                                    ></Button>
                                                </Space>
                                            </Flex>
                                        </>
                                    ))}
                                </div>
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
                            </Card>
                        </Col>
                    </Row>
                </>
            ),
        },
    ];
    const handleDelOk =async () => {
        if (typeof currentAddress !== 'undefined') {
            await mutation.mutateAsync(currentAddress.id)
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Container>
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
                {isLoading ? (
                    <ProfileLoading />
                ) : (
                    data && (
                        <>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                            <Modal
                                title="Notification"
                                open={open}
                                //onOk={handleOk}
                                confirmLoading={mutation.isPending}
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
                                confirmLoading={mutation.isPending}
                                onCancel={() => {
                                    setOpenDel(false);
                                }}
                            >
                                Do you want to detele!
                            </Modal>
                        </>
                    )
                )}
        </Container>
    );
}
const getLateArray =  (os: OrderStatus[] | undefined) => {
    if (os && os.length > 0) {
        return os[os.length - 1].name;
    }
    return 'error';
};
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
