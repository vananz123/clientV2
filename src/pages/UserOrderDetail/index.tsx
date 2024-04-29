import { Order, OrderDetail, OrderStatus, Review } from '@/api/ResType';
import React, { useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import { Button, Col, Descriptions, Drawer, Form, FormProps, Input, Popconfirm, Rate, Row, Timeline ,notification} from 'antd';
import { DescriptionsProps, Space } from 'antd';
import { BaseUrl } from '@/utils/request';
import * as reviewServices from '@/api/reviewServices'
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
    const baseUrl =import.meta.env.VITE_BASE_URL
    const [form] = Form.useForm();
    const user = useAppSelector(selectUser)
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const openNotificationWithIcon = (type: NotificationType,mess:string) => {
        api[type]({
            message: 'Notification Title',
            description:mess
        });
    };
    const [order, setOrder] = React.useState<Order>();
    const [currentOD,setCurrentOD] = React.useState<OrderDetail>()
    const [statusTimeLine, setStatusTimeLine] = React.useState<TimeLineProps[]>([]);
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
                            order?.address?.city}
                    </p>
                </>
            ),
            span: 1,
        },
        {
            key: 'paymentMethod',
            label: 'Payment method',
            children: `${order?.paymentMethod?.paymentType}`,
            span: 1,
        },
        {
            key: 'orderTotal',
            label: 'Total',
            children: `${order?.orderTotal}`,
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
        {
            key: 'orderDetail',
            label: 'Products',
            children: (
                <div>
                    {order?.orderDetail?.map((e: OrderDetail) => (
                        <Row align={'middle'}>
                            <Col span={12}>
                                <p>{e.seoTitle}</p>
                                <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: 70 }} />
                            </Col>
                            <Col span={4}>
                                <p>{e.quantity}</p>
                            </Col>
                            <Col span={4}>
                                <p>{e.total}</p>
                            </Col>
                            <Col span={4}>
                            <Space>
                        <Button onClick={()=>{showDrawer(e)}}>Comment</Button>
                    </Space>
                            </Col>
                        </Row>
                    ))}
                </div>
            ),
            span: 2,
        },
    ];

    const onFinish: FormProps<Review>['onFinish'] = async (values) => {
        if(currentOD != undefined && user != undefined){
            if(currentOD?.review == undefined){
                values.userId = user.id;
                values.orderDetailId = currentOD.id;
                console.log(values)
                const res =await reviewServices.createReivew(values)
                if(res.isSuccessed == true){
    
                    onClose()
                }
                
            }else{
                values.id = currentOD?.review.id;
                const res =await reviewServices.updateReivew(values)
                if(res.isSuccessed == true){
                    onClose()
                }
            }
        }
        

        // if (currentData != undefined) {
        //     const res = await .review(currentData?.id, Number(values.reviewNote), values.reviewComment);
        //     if (res.statusCode == 200) {

        //         onClose();
        //     }
        // }
    };

    const onFinishFailed: FormProps<Review>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (key: string) => {
        console.log(key);
    };
    const [open, setOpen] = React.useState(false);

    const showDrawer = (e:OrderDetail) => {
        setCurrentOD(e);
        if(e?.review == null){
            form.setFieldValue('comment','')
            form.setFieldValue('rate',0)
        }else{
            form.setFieldsValue(e.review)
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
                console.log(res.resultObj)
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
            <Descriptions
                title="Order Info"
                column={2}
                size="middle"
                items={desOrder}
                bordered
            />
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
                            name='comment'
                            tooltip="What do you want others to call you?"
                            //valuePropName='name'
                            //initialValue={currentOD?.review?.comment}
                            rules={[{ required: true, message: 'Please input Content!', whitespace: true }]}
                        >
                            <Input.TextArea placeholder="Content" />
                        </Form.Item>
                        <Form.Item<Review>
                            name='rate'
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

export default UserOrderDetail;
