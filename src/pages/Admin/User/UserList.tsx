import { Table, Space, Pagination, Modal, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Link } from 'react-router-dom';
import * as userServices from '@/api/userServices'

import { ResponseUser } from '@/api/ResType';
function UserList() {
    const dispatch = useAppDispatch();
    const [data, setData] = React.useState<ResponseUser[]>();
    const [currentId, setCurrentId] = React.useState<number>(0);
    const columns: TableProps<ResponseUser>['columns'] = [
       {
            title: 'Tên',
            dataIndex: 'userName',
            key: 'name',
        },
        {
            title: 'Họ Tên',
            dataIndex: 'fullName',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'name',
        },{
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            key: 'name',
        },{
            title: 'Quyền',
            dataIndex: 'roles',
            key: 'roles',
            render:((_,record)=>(
                <p>{record.roles}</p>
            ))
        },
    ]
    const getAllUser = async () => {
        const res = await userServices.getAllUser();
        console.log(res)
        if (res.isSuccessed === true) {
            setData(res.resultObj.items);
        }
    };
    useEffect(() => {
        getAllUser();
    }, []);
    return <div>
         <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
    </div>;
}

export default UserList;