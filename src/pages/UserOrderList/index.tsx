import { Order, OrderStatus } from '@/api/ResType';
import Container from '@/conponents/Container';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Divider, Result, Row, Space, Tabs } from 'antd';
import * as orderServices from '@/api/orderServices';
import dayjs from 'dayjs';
import { Suspense, lazy } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { selectOrderStatus ,changeOrderStatus} from '@/app/feature/order-status/reducer';
import { STATUS_ORDER } from '@/common/common';
import { ChangeCurrence } from '@/utils/utils';
const UserOrderListLoading = lazy(() => import('./UserOrderListLoading'));
function UserOrderList() {
    const Navigate = useNavigate();
    const dispatch  = useAppDispatch()
    const {name:statusName} = useAppSelector(selectOrderStatus);
    const { data: user } = useAppSelector(selectUser);
    const id = user ? user.id : ''
    const { data, isLoading } = useQuery({
        queryKey: [`load-user-order-list`,id,statusName],
        queryFn: () => orderServices.getOrderByUserId( id, statusName),
        enabled: !!id,
    });
    const onChange = (key: string | undefined) => {
        if (key) dispatch(changeOrderStatus(key));
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
                Trở lại
            </Button>
            <Tabs activeKey={statusName} items={STATUS_ORDER} onChange={onChange} />
            {isLoading ? (
                <Suspense>
                    {' '}
                    <UserOrderListLoading />
                </Suspense>
            ) : (
                <>
                    {data && data.length > 0 ? (
                        data.map((e: Order) => (
                            <>
                                <Row key={e.id} align={'middle'} style={{ padding: 10 }}>
                                    <Col xs={24} md={8} lg={8}>
                                        <Space wrap>
                                            <p>Thành tiền: {ChangeCurrence(e.orderTotal)}</p>
                                            <em>{dayjs(e.orderDate).format('MM/DD/YYYY, HH:MM')}</em>
                                        </Space>
                                    </Col>
                                    <Col xs={24} md={6} lg={6}>
                                        <Space>
                                            <p>Tình trạng: </p>
                                            <Badge status="processing" text={getLateArray(e.status)} />
                                        </Space>
                                    </Col>
                                    <Col xs={24} md={6} lg={6}>
                                        <Space>
                                            <p>Nhận Hàng: </p>
                                            <Badge status="processing" text={e.shippingName} />
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
                                        Navigate('/');
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
export default UserOrderList;
