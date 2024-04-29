import { Order } from '@/api/ResType';
import { BaseUrl } from '@/utils/request';
import { Table, Input, Space, Pagination, Image, Modal, Upload, Button, Flex, Badge } from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect } from 'react';
import * as orderServices from '@/api/orderServices';
import { Link } from 'react-router-dom';
function OrderList() {
    const baseUrl =import.meta.env.VITE_BASE_URL
    const [data, setData] = React.useState<Order[]>();
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
            render:(_,record)=>(
                <p>{record.user.email}</p>
            )
        },
        {
            title: 'Order total',
            dataIndex: 'orderTotal',
            key: 'orderTotal',
        },
        {
            title: 'orderDate',
            dataIndex: 'orderDate',
            key: 'orderDate',
            render:(_,record)=>(
                <p>{new Date(record.orderDate).toUTCString()}</p>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render:(_,record)=>(
                <Badge status='processing' text={record.status?.pop()?.name}/>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a >Delete</a>
                    <Link  key={`a-${record.id}`} to={`/admin/order/detail/${record.id}`}>
                        View Detail
                    </Link>
                </Space>
            ),
        },
    ];
    const loadOrder = async () => {
        const res = await orderServices.getOrderAdmin();
        if (res.isSuccessed == true) {
            const arrSort: Order[] = res.resultObj.items.sort((a: Order, b: Order) => {
                let aa = new Date(a.orderDate).getTime();
                let bb = new Date(b.orderDate).getTime();
                return bb - aa;
            });
            setData(arrSort);
        }
    };
    useEffect(() => {
        
        loadOrder();
    }, []);
    return <div>
        <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
    </div>;
}

export default OrderList;