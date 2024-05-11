import { Order, OrderDetail, OrderStatus, Review } from '@/api/ResType';
import React, { useEffect } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import {
    Button,
    Card,
    Col,
    Descriptions,
    Drawer,
    Form,
    FormProps,
    Input,
    Popconfirm,
    Rate,
    Row,
    Timeline,
    notification,
} from 'antd';
import { DescriptionsProps, Space } from 'antd';
import { BaseUrl } from '@/utils/request';
import * as reviewServices from '@/api/reviewServices';
import { ArrowDownOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/feature/user/userSlice';
type NotificationType = 'success' | 'error';
type TimeLineProps = {
    label?: string;
    children: string;
};
function UserOrderDetail() {
    let { id } = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [form] = Form.useForm();
    const user = useAppSelector(selectUser);
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const [order, setOrder] = React.useState<Order>();
    const [currentOD, setCurrentOD] = React.useState<OrderDetail>();
    const [statusTimeLine, setStatusTimeLine] = React.useState<TimeLineProps[]>([]);
    const [openCancel, setOpenCancel] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const desOrder: DescriptionsProps['items'] = [
        {
            key: 'address',
            label: 'Address',
            children: (
                <>
                    <p>{order?.address?.phoneNumber}</p>
                    <p>
                        {order?.address?.streetNumber +
                            ', ' +
                            order?.address?.wardCommune +
                            ', ' +
                            order?.address?.urbanDistrict +
                            ', ' +
                            order?.address?.province}
                    </p>
                </>
            ),
        },
        {
            key: 'paymentMethod',
            label: 'Payment method',
            children: `${order?.paymentMethod?.paymentType}`,
        },
        {
            key: 'orderTotal',
            label: 'Total',
            children: `${ChangeCurrence(order?.orderTotal)}`,
        },
        {
            key: 'status',
            label: 'Status',
            children: (
                <div>
                    <Timeline mode={'left'} items={statusTimeLine} />
                </div>
            ),
        },
    ];

    const onFinish: FormProps<Review>['onFinish'] = async (values) => {
        if (currentOD != undefined && user != undefined) {
            if (currentOD?.review == undefined) {
                values.userId = user.id;
                values.orderDetailId = currentOD.id;
                console.log(values);
                const res = await reviewServices.createReivew(values);
                if (res.isSuccessed == true) {
                    onClose();
                }
            } else {
                values.id = currentOD?.review.id;
                const res = await reviewServices.updateReivew(values);
                if (res.isSuccessed == true) {
                    onClose();
                }
            }
        }
    };

    const onFinishFailed: FormProps<Review>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (key: string) => {
        console.log(key);
    };
    const [open, setOpen] = React.useState(false);

    const showDrawer = (e: OrderDetail) => {
        setCurrentOD(e);
        if (e?.review == null) {
            form.setFieldValue('comment', '');
            form.setFieldValue('rate', 0);
        } else {
            form.setFieldsValue(e.review);
        }

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const getOrderByOrderId = async () => {
        if (typeof id != 'undefined') {
            const res = await orderServices.getOrderDetailByOrderId(Number(id));
            if (res.isSuccessed == true) {
                console.log(res.resultObj);
                setOrder(res.resultObj);
                let arr: TimeLineProps[] = [];
                res.resultObj.status?.forEach((element: OrderStatus) => {
                    const line: TimeLineProps = {
                        //label:new Date(element.createAt).toUTCString(),
                        children: element.name + ': ' + new Date(element.createAt).toUTCString(),
                    };
                    arr.push(line);
                });
                setStatusTimeLine(arr);
            }
        }
    };

    useEffect(() => {
        getOrderByOrderId();
    }, [id]);
    const comfirmCacel = async()=>{
        setConfirmLoading(true);
        setTimeout(async() => {
            if(typeof order != 'undefined'){
                const res = await orderServices.canceled(order.id)
                if(res.isSuccessed === true){
                    openNotificationWithIcon('success',res.message)
                    getOrderByOrderId()
                }else{
                    openNotificationWithIcon('error',res.message)
                }
            }
            setOpenCancel(false);
            setConfirmLoading(false);
        }, 300);
    }
    return (
        <div>
            {contextHolder}
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    navigate(-1);
                }}
            >
                Go back
            </Button>
            <Row gutter={16}>
            <Col span={8}  xs={24} md={24} lg={8} xl={8}>
                    <Descriptions title="Order Info" column={1} size="middle" items={desOrder} bordered/>
                    <Popconfirm
                            title="Xác nhận"
                            description="Thao táo này không thể hoàn tác!"
                            placement='topLeft'
                            open={openCancel}
                            onConfirm={comfirmCacel}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={()=>{setOpenCancel(false);}}
                        >
                            <Button disabled={order?.status?.some(s => s.name ==="Đã hủy" || s.name ==="Đã tiếp nhận")} style={{marginTop:10}} type='primary' danger block onClick={()=>{setOpenCancel(true)}}>Cancel</Button>
                        </Popconfirm>
                    
                </Col>
                <Col span={16} xs={24} md={24} lg={16} xl={16}>
                    <div>
                        {order?.orderDetail?.map((e: OrderDetail) => (
                            <Row align={'top'}>
                                <Col span={8} xs={12} md={12} lg={8} xl={8}>
                                    <p><Link to={`/product/detail/${e.productId}`}>{e.seoTitle}</Link></p>
                                    <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: 70 }} />
                                </Col>
                                <Col span={4} xs={4} md={4} lg={3} xl={3}>
                                    <p>Quantity: {e.quantity}</p>
                                </Col>
                                <Col span={4} xs={8} md={8} lg={5} xl={5}>
                                    {/* <p>Total:{ChangeCurrence(e.total)}</p> */}
                                </Col>
                                <Col span={8} xs={24} md={24} lg={8} xl={8}>
                                    <Col>
                                        <Card
                                            size="small"
                                            title="Review"
                                            extra={
                                                <Button
                                                    type="primary"
                                                    size="small"
                                                    onClick={() => {
                                                        showDrawer(e);
                                                    }}
                                                >
                                                    {e.review?.comment == null ? 'Review' : 'Edit review'}
                                                </Button>
                                            }
                                        >
                                            {e.review != undefined ? (
                                                <div style={{ marginBottom: 10 }}>
                                                    <p>{e.review?.comment || ''}</p>
                                                    <Rate value={e.review?.rate} />
                                                </div>
                                            ) : (
                                                "Don't hava comment"
                                            )}
                                        </Card>
                                    </Col>
                                </Col>
                            </Row>
                        ))}
                    </div>
                </Col>
                
            </Row>

            <Drawer title="Basic Drawer" onClose={onClose} open={open}>
                {order != undefined ? (
                    <Form
                        form={form}
                        name="productFrom"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{ maxWidth: 600 }}
                        scrollToFirstError
                    >
                        <Form.Item<Review>
                            name="comment"
                            tooltip="What do you want others to call you?"
                            //valuePropName='name'
                            //initialValue={currentOD?.review?.comment}
                            rules={[{ required: true, message: 'Please input Content!', whitespace: true }]}
                        >
                            <Input.TextArea placeholder="Content" />
                        </Form.Item>
                        <Form.Item<Review>
                            name="rate"
                            //initialValue={currentOD?.review?.rate || 0}
                        >
                            <Rate />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ width: '100px' }}>
                                {' '}
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    ''
                )}
            </Drawer>
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
export default UserOrderDetail;
