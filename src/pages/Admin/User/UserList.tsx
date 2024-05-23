import { Button, Modal, Select, Table, Tabs } from 'antd';
import type { TableProps } from 'antd';
import React, { useCallback, useEffect } from 'react';
import * as userServices from '@/api/userServices';
import { ResponseUser, RoleType } from '@/api/ResType';
import { EditOutlined } from '@ant-design/icons';
interface ItemRole {
    key: string;
    label: string;
    value:string;
}
function UserList() {
    const [data, setData] = React.useState<ResponseUser[]>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [currentUser, setCurrentUser] = React.useState<ResponseUser>();
    const [listRoles, setListRoles] = React.useState<ItemRole[]>([]);
    const [roleKey, setRoleKey] = React.useState<string>('');
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
                        setOpen(true);
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
    const getAllRolesGenerator = useCallback(async () => {
        const res = await userServices.getRoles();
        if (res.isSuccessed === true) {
            const item: ItemRole[] = [];
            res.resultObj.forEach((e: RoleType) => {
                const i: ItemRole = {
                    label: e.name,
                    key: e.name,
                    value:e.name,
                };
                item.push(i);
            });
            setListRoles(item);
            setRoleKey(item[0].key)
            getAllUser(item[0].key)
        }
    },[]);
    useEffect(() => {
        getAllRolesGenerator();
    }, [getAllRolesGenerator]);
    const onChange = (key: string) => {
        getAllUser(key);
        setRoleKey(key)
    };
    const handleChangeSelect = (value:string)=>{
        setRoleKey(value)
    }
    const handleAssginRole = async()=>{
        if(typeof currentUser !== 'undefined'){
            await userServices.assginRoles(currentUser.id,roleKey)
            setOpen(false)
            getAllRolesGenerator()
        }
    }
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
            <Modal onCancel={() => setOpen(false)} onOk={()=>handleAssginRole()} open={open} title={'Edit role'}>
                <Select onChange={handleChangeSelect} value={roleKey} style={{width:'100%'}} options={listRoles} />
            </Modal>
        </div>
    );
}

export default UserList;
