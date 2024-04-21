import { Table, Space, Pagination, Modal, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import type { PaginationProps } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addCateAsync, selectCate } from '@/feature/category/cateSlice';
import SearchC from '@/conponents/SearchC';
import { Link } from 'react-router-dom';
import { Category } from '../Product/ProductList';

function CategoriesList() {
    const dispatch = useAppDispatch();
    const [data, setData] = React.useState<Category[]>();
    const dataGlobal = useAppSelector(selectCate);
    const [currentId, setCurrentId] = React.useState<string>('');
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [context,setContext] = React.useState<string>('OK');

    const columns: TableProps<Category>['columns'] = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/category-edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    useEffect(() => {
        setData(dataGlobal);
    }, [dataGlobal]);
    const showModalDel = (id: string, name: string) => {
        setModalText(`Do you want category ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const handleOkDel = () => {
        setModalText('deleting!');
        setConfirmLoading(true);
        setContext('')
        setTimeout(async () => {
            const res = await categoryServices.deleteCate(currentId);
            if (res.statusCode == 204) {
              const ref = await categoryServices.getAllCate()
              if(ref.statusCode ==200){
                setData(ref.resultObj);
                setOpen(false);
                dispatch(addCateAsync(ref.resultObj))
                setConfirmLoading(false);
              }
            } else {
                setModalText('error!');
                setConfirmLoading(false);
                setContext('OK')
            }
        }, 500);
    };
    return (
        <div>
            <Space direction="vertical" style={{width:"100%"}}>
                <Flex justify="space-between">
                    <Link to={'/admin/category-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Add
                        </Button>
                    </Link>
                    {/* <SearchC typeSearch={2} onSetState={setData} /> */}
                </Flex>
                <Table  pagination={{ position:['bottomLeft'], pageSize:4 }} columns={columns} dataSource={data} />
            </Space>
            <Modal
                title="Delete"
                open={open}
                onOk={handleOkDel}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
                okText={context}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    );
}

export default CategoriesList;
