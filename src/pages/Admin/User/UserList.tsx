import { Button, Table, Tabs } from 'antd';
import type { TableProps } from 'antd';
import React, { useEffect } from 'react';
import * as userServices from '@/api/userServices';
import { ResponseUser, RoleType } from '@/api/ResType';
import { EditOutlined } from '@ant-design/icons';
interface ItemRole {
    key: string;
    label: string;
}
function UserList() {
    const [data, setData] = React.useState<ResponseUser[]>();
    const [currentUser, setCurrentUser] = React.useState<ResponseUser>();
    const [listRoles, setListRoles] = React.useState<ItemRole[]>([]);
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
        },
        {
            title: 'SĐT',
            dataIndex: 'phoneNumber',
            key: 'name',
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'Action',
            render: (_, record) => (
                <Button
                    onClick={() => {
                        setCurrentUser(record);
                    }}
                    icon={<EditOutlined />}
                >
                    Edit role
                </Button>
            ),
        },
    ];
    const getAllUser = async (roleName: string) => {
        const res = await userServices.getAllUser(roleName);
        console.log(res);
        if (res.isSuccessed === true) {
            setData(res.resultObj);
        }
    };
    const getAllRolesGenerator = async () => {
        const res = await userServices.getRoles();
        console.log(res);
        if (res.isSuccessed === true) {
            const item: ItemRole[] = [];
            res.resultObj.forEach((e: RoleType) => {
                const i: ItemRole = {
                    label: e.name,
                    key: e.name,
                };
                item.push(i);
            });
            setListRoles(item);
        }
    };
    useEffect(() => {
        getAllRolesGenerator();
    }, []);
    const onChange = (key: string) => {
        getAllUser(key);
    };
    return (
        <div>
            <Tabs
                defaultActiveKey="customer"
                items={listRoles}
                onChange={onChange}
                indicator={{
                    size: (origin) => origin - 20,
                }}
            />
            <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
        </div>
    );
}

export default UserList;
