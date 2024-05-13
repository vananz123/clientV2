import { Order, OrderDetail, OrderStatus } from '@/api/ResType';
import React, { useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import * as orderServices from '@/api/orderServices';
import { Link } from 'react-router-dom';
import { Button, Col, Descriptions, Popconfirm, Row, Timeline ,notification, Divider, Card} from 'antd';
import { DescriptionsProps, Space } from 'antd';
type NotificationType = 'success' | 'error';
type TimeLineProps = {
    label?: string;
    children: string;
};
function OrderConfirm() {
    const { id } = useParams();
    const baseUrl =import.meta.env.VITE_BASE_URL
    const [api, contextHolder] = notification.useNotification();
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
            label: 'Địa chỉ',
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
            span: 1,
        },
        {
            key: 'paymentMethod',
            label: 'Loại Thanh Toán',
            children: `${order?.paymentMethod?.paymentType}`,
            span: 1,
        },
        {
            key: 'total',
            label: 'Tổng Tiền',
            children: `${ChangeCurrence(order?.orderTotal)}`,
        },
        {
            key: 'status',
            label: 'Trạng Thái',
            children: (
                <div>
                    <Timeline mode={'left'} items={statusTimeLine} />
                </div>
            ),
        },
        // {
        //     key: 'orderDetail',
        //     label: 'Sản Phẩm',
        //     children: (
        //         <div>
        //             {order?.orderDetail?.map((e: OrderDetail) => (
        //                 <Row align={'middle'}>
        //                     <Col span={12}>
        //                         <p>{e.seoTitle}</p>
        //                         <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: 70 }} />
        //                     </Col>
        //                     <Col span={6}>
        //                         <p>{e.quantity}</p>
        //                     </Col>
        //                     <Col span={6}>
        //                         <p>{e.total}</p>
        //                     </Col>
        //                 </Row>
        //             ))}
        //         </div>
        //     ),
        //     span: 2,
        // },
    ];
    const desUser: DescriptionsProps['items'] = [
        {
            key: 'fullName',
            label: 'Tên Khách Hàng',
            children: `${order?.user.fullName}`,
        },
        {
            key: 'Email',
            label: 'Email',
            children: `${order?.user.email}`,
        },
        {
            key: 'Phone number',
            label: 'Số Điện Thoại',
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
                const arr: TimeLineProps[] = [];
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
            {/* <Descriptions
                title="Thông Tin Đơn Hàng"
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
            />   */}
            <Row gutter={16}>
                <Col span={8} xs={24} md={24} lg={8} xl={8}>
                    <Descriptions title="Thông Tin Đơn Hàng" column={1} size="middle" items={desOrder} bordered />
                </Col>
                <Col span={16} xs={24} md={24} lg={16} xl={16}>
                    <Card title="Danh sách sản phẩm" bordered={false}>
                        <div>
                            {order?.orderDetail?.map((e: OrderDetail) => (
                                <>
                                    <Row align={'top'}>
                                        <Col span={8} xs={12} md={12} lg={8} xl={8}>
                                            <p>
                                                <Link to={`/product/detail/${e.productId}`}>{e.seoTitle}</Link>
                                            </p>
                                            <img src={`${baseUrl + e.urlThumbnailImage}`} style={{ width: 70 }} />
                                        </Col>
                                        <Col span={3}>
                                            <p>Số lượng: {e.quantity}</p>
                                        </Col>
                                        <Col span={4} xs={4} md={4} lg={3} xl={3}>
                                            <p>Giá: {ChangeCurrence(e.price)}</p>
                                            {e.value != undefined ? <p>Size: {e.value + ' ' + e.sku}</p> : ''}
                                        </Col>
                                        <Col span={4} xs={8} md={8} lg={5} xl={5}>
                                            {/* <p>Total:{ChangeCurrence(e.total)}</p> */}
                                        </Col>
                                    </Row>
                                    <Divider />
                                </>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
            <Descriptions title="Thông Tin Khách Hàng" column={3} size="middle" items={desUser} bordered />
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
export default OrderConfirm;
