import { Order, OrderDetail, OrderStatus } from '@/api/ResType';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import { Button, Col, Descriptions, Popconfirm, Row, Timeline ,notification} from 'antd';
import { DescriptionsProps, Space } from 'antd';
import { BaseUrl } from '@/utils/request';
type NotificationType = 'success' | 'error';
type TimeLineProps = {
    label?: string;
    children: string;
};
function OrderConfirm() {
    let { id } = useParams();
    const baseUrl =import.meta.env.VITE_BASE_URL
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const openNotificationWithIcon = (type: NotificationType,mess:string) => {
        api[type]({
            message: 'Notification Title',
            description:mess
        });
    };
    const [order, setOrder] = React.useState<Order>();
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
                            <Col span={6}>
                                <p>{e.quantity}</p>
                            </Col>
                            <Col span={6}>
                                <p>{e.total}</p>
                            </Col>
                        </Row>
                    ))}
                </div>
            ),
            span: 2,
        },
    ];
    const desUser: DescriptionsProps['items'] = [
        {
            key: 'fullName',
            label: 'Full name',
            children: `${order?.user.fullName}`,
        },
        {
            key: 'Email',
            label: 'email',
            children: `${order?.user.email}`,
        },
        {
            key: 'Phone number',
            label: 'Phone number',
            children: `${order?.user.phoneNumber}`,
        },
    ];
    const [openConfrim, setOpenConfrim] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const showPopconfirmCancel = () => {
        setOpenCancel(true);
    };
    const showPopconfirm = () => {
        setOpenConfrim(true);
    };
    const handleOkCancel = () => {
        setConfirmLoading(true);
        setTimeout(async() => {
            if(typeof order != 'undefined'){
                const res = await orderServices.canceled(order.id)
                if(res.isSuccessed === true){
                    openNotificationWithIcon('success',res.message)
                    getOrderAdminByOrderId()
                }else{
                    openNotificationWithIcon('error',res.message)
                }
            }
            setOpenConfrim(false);
            setConfirmLoading(false);
        }, 300);
    };
    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(async() => {
            if(typeof order != 'undefined'){
                const res = await orderServices.comfirm(order.id)
                if(res.isSuccessed === true){
                    openNotificationWithIcon('success',res.message)
                    getOrderAdminByOrderId()
                }else{
                    openNotificationWithIcon('error',res.message)
                }
            }
            setOpenConfrim(false);
            setConfirmLoading(false);
        }, 300);
    };
    const getOrderAdminByOrderId = async () => {
        if (typeof id != 'undefined') {
            const res = await orderServices.getOrderAdminByOrderId(Number(id));
            if (res.isSuccessed == true) {
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
        getOrderAdminByOrderId();
    }, [id]);
    return (
        <div>
             {contextHolder}
            <Descriptions
                title="Order Info"
                column={2}
                size="middle"
                items={desOrder}
                bordered
                extra={
                    <Space>
                        <Popconfirm
                            title="Xác nhận"
                            description="Thao táo này không thể hoàn tác!"
                            open={openConfrim}
                            onConfirm={handleOk}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={()=>{setOpenConfrim(false);}}
                        >
                            <Button disabled={order?.status?.some(s => s.name =="Đã tiếp nhận" || s.name ==="Đã hủy")} onClick={()=>{showPopconfirm()}}>Confrim</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Xác nhận"
                            description="Thao táo này không thể hoàn tác!"
                            placement='bottomLeft'
                            open={openCancel}
                            onConfirm={handleOkCancel}
                            okButtonProps={{ loading: confirmLoading }}
                            onCancel={()=>{setOpenCancel(false);}}
                        >
                            <Button danger onClick={()=>{showPopconfirmCancel()}}>Cancel</Button>
                        </Popconfirm>
                    </Space>
                }
            />
           
            <Descriptions title="User Info" column={3} size="middle" items={desUser} bordered />
        </div>
    );
}

export default OrderConfirm;
