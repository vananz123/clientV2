import { Table, Space, Modal, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import * as promotionServices from '@/api/promotionServices';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { Promotion } from '@/api/ResType';

function PromotionList() {
    const [data, setData] = React.useState<Promotion[]>();
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [context, setContext] = React.useState<string>('OK');

    const columns: TableProps<Promotion>['columns'] = [
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
            title: 'Title',
            dataIndex: 'seoTitle',
            key: 'name',
        },
        {
            title: 'Discount Rate',
            dataIndex: 'discountRate',
            key: 'name',
        },
        {
            title: 'Start Date',
            dataIndex: 'startDate',
            key: 'name',
            render: (_, record) => <p>{new Date(record.startDate).toUTCString()}</p>,
        },
        {
            title: 'End Date',
            dataIndex: 'endDate',
            key: 'name',
            render: (_, record) => <p>{new Date(record.endDate).toUTCString()}</p>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/promotion-edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Delete</a>
                </Space>
            ),
        },
    ];
    const showModalDel = (id: number, name: string) => {
        setModalText(`Do you want category ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const getAllPromotion = async () => {
        const res = await promotionServices.getAllPromotion();
        console.log(res)
        if (res.isSuccessed === true) {
            setData(res.resultObj);
        }
    };
    useEffect(() => {
        getAllPromotion();
    }, []);
    const handleOkDel = () => {
        setModalText('deleting!');
        setConfirmLoading(true);
        setContext('');
        setTimeout(async () => {
            const res = await promotionServices.DeletaPromotion(currentId)
            if (res.isSuccessed === true) {
                getAllPromotion()
                setOpen(false);
                setConfirmLoading(false);
            } else {
                setModalText('error!');
                setConfirmLoading(false);
                setContext('OK')
            }
        }, 300);
    };
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/admin/promotion-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Add
                        </Button>
                    </Link>
                    {/* <SearchC typeSearch={2} onSetState={setData} /> */}
                </Flex>
                <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
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

export default PromotionList;
