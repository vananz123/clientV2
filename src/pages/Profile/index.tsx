import { ArrowDownOutlined, ArrowLeftOutlined, DollarOutlined, MinusOutlined } from '@ant-design/icons';
import {
    Badge,
    Button,
    Card,
    Col,
    Descriptions,
    Divider,
    Drawer,
    Form,
    FormProps,
    Input,
    Modal,
    Rate,
    Result,
    Row,
    Space,
} from 'antd';
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/feature/user/userSlice';
import { Order, Review } from '@/api/ResType';
import { Tabs } from 'antd';
import type { DescriptionsProps, TabsProps } from 'antd';
function Profile() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const [form] = Form.useForm();
    const [data, setData] = React.useState<Order[]>([]);
    const [currentData, setCurrentData] = React.useState<Order>();
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
    useEffect(() => {
        getAllPurchase();
    }, []);
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
        },
        {
            key: '2',
            label: 'Email',
            children: <p>{user?.email}</p>,
        },
        {
            key: '3',
            label: 'Address',
            children: <p>{user?.phoneNumber}</p>,
        },
    ];
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'List purchase',
            children: (
                <>
                    {data.length > 0 ? (
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
                                        <Button>Review</Button>
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
                    <Descriptions size="middle" items={desUser} bordered />
                </>
            ),
        },
    ];
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
