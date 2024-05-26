import { Order } from '@/api/ResType';
import { Table, Space, Badge, Tabs, Spin, Button } from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect } from 'react';
import * as orderServices from '@/api/orderServices';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { DeleteOutlined, InfoCircleOutlined } from '@ant-design/icons';
function OrderList() {
    // const baseUrl =import.meta.env.VITE_BASE_URL
    const [data, setData] = React.useState<Order[]>();
    const [confirmLoading, setConfirmLoading] = React.useState<boolean>(false);
    const columns: TableProps<Order>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'user',
            key: 'user',
            render: (_, record) => <p>{record.user.email}</p>,
        },
        {
            title: 'Tổng Tiền Hóa Đơn',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
            render:(_, record) => (
                <p>{ChangeCurrence(record.orderTotal)}</p>
            )
        },
        {
            title: 'Ngày Tạo',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render: (_, record) => <p>{dayjs(record.orderDate).format('MM/DD/YYYY, HH:mm')}</p>,
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => <Badge status="processing" text={record.status?.pop()?.name} />,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<DeleteOutlined/>}></Button>
                    <Link key={`a-${record.id}`} to={`/admin/order/detail/${record.id}`}>
                        <Button icon={<InfoCircleOutlined/>}></Button>
                    </Link>
                </Space>
            ),
        },
    ];
    const onChange = (key: string | undefined) => {
        setConfirmLoading(true);
        if (key == 'All') {
            loadOrder(undefined);
            setConfirmLoading(false);
        } else {
            loadOrder(key);
            setConfirmLoading(false);
        }
    };
    const items = [
        {
            key: 'Đang xử lý',
            label: 'Đang xử lý',
            children: <></>,
        },
         {
            key: 'Đã tiếp nhận',
            label: 'Đã tiếp nhận',
            children:  <></>,
        }, {
            key: 'Đã hoàn thành',
            label: 'Đã hoàn thành',
            children:  <></>,
        },{
            key: 'Đã hủy',
            label: 'Đã hủy',
            children:  <></>,
        },{
            key: 'Trả hàng',
            label: 'Trả hàng',
            children:  <></>,
        },
        {
            key: 'All',
            label: 'All',
            children:  <></>,
        },
    ];
    const loadOrder = async (statusName: string | undefined) => {
        const res = await orderServices.getOrderAdmin(statusName);
        if (res.isSuccessed == true) {
            setData(res.resultObj.items);
        }
    };
    useEffect(() => {
        loadOrder('Đang xử lý');
    }, []);
    return (
        <div>
            <Spin spinning={confirmLoading}>
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                    indicator={{
                        size: (origin) => origin - 20,
                    }}
                />
                <Table pagination={{ position: ['bottomLeft'], pageSize: 10 }} columns={columns} dataSource={data} />
            </Spin>
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
export default OrderList;
