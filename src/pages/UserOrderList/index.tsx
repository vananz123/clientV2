import { Order, OrderStatus } from '@/api/ResType';
import Container from '@/conponents/Container';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Divider, Result, Row, Space, Tabs } from 'antd';
import * as orderServices from '@/api/orderServices';
import dayjs from 'dayjs';
import React, { Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
const UserOrderListLoading = lazy(() => import('./UserOrderListLoading'));
function UserOrderList() {
    const Navigate = useNavigate();
    const { data: user } = useAppSelector(selectUser);
    const items = [
        {
            key: 'Đang xử lý',
            label: 'Đang xử lý',
            children: <></>,
        },
        {
            key: 'Đã tiếp nhận',
            label: 'Đã tiếp nhận',
            children: <></>,
        },
        {
            key: 'Đã hoàn thành',
            label: 'Đã hoàn thành',
            children: <></>,
        },
        {
            key: 'Đã hủy',
            label: 'Đã hủy',
            children: <></>,
        },
        {
            key: 'Trả hàng',
            label: 'Trả hàng',
            children: <></>,
        }
    ];
    const [statusName, setStatusName] = React.useState<string>('Đang xử lý' );
    const { data, isLoading } = useQuery({
        queryKey: [`load-user-order-list-${statusName}`],
        queryFn: () => orderServices.getOrderByUserId(user ? user.id : '', statusName),
        enabled:!!statusName,
    });
    console.log(data);
    const onChange = (key: string | undefined) => {
        if (key)  setStatusName(key);
    };
    return (
        <Container>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    Navigate(-1);
                }}
            >
                Go back
            </Button>
            <Tabs activeKey={statusName} items={items} onChange={onChange} />
            {isLoading ? (
               <Suspense> <UserOrderListLoading /></Suspense>
            ) : (
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
                                        <Link to={`/order/detail/${e.id}`}>
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
            )}
        </Container>
    );
}
const getLateArray = (os: OrderStatus[] | undefined) => {
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
        });
        return formattedNumber;
    }
    return 0;
};
export default UserOrderList;
