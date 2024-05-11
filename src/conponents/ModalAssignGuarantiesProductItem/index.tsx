/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import * as guarantyServieces from '@/api/guarantyServices';
import * as productServices from "@/api/productServices"
import { Guaranty, ProductItem } from '@/type';
import { Button, Flex, Modal, Space, Table, TableColumnsType } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
export type ModePromotionType = 'EDIT' | 'DEL';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
const ModalAssignGuarantiesProductItem: React.FC<{
    openModalAssignPI: boolean;
    setStateOpenModalAssignPI: SetStateAction<any>;
    productItemProps:ProductItem | undefined
}> = ({ openModalAssignPI, setStateOpenModalAssignPI ,productItemProps}) => {
    const [guaranties, setGuaranties] = React.useState<Guaranty[]>([]);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [listSelectRowKeys,setListSelectRowKeys] = React.useState<number[]>([])
    const [listSelectRow, setListSelectRow] = React.useState<Guaranty[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const getAllGuaranty = async () => {
        const res = await guarantyServieces.getAllGuaranty();
        if (res.isSuccessed === true) {
            setGuaranties(res.resultObj);
        }
    };
    const handleSaveGuaranties = async ()=>{
        setConfirmLoading(true)
        if(productItemProps != undefined){
            const res = await productServices.assignGuaranties(productItemProps?.id,guaranties.filter(s => listSelectRowKeys.includes(s.id)))
            if(res.isSuccessed === true){
                openNotificationWithIcon('success','thêm bảo hành thành công')
                setConfirmLoading(false)
            }else{
                openNotificationWithIcon('error','lỗi')
                setConfirmLoading(false)
            }
        }
    }
    useEffect(() => {
        getAllGuaranty();
        if(typeof productItemProps !== 'undefined'){
            const arrKey:number[] = []
            productItemProps.guaranties?.forEach((e:Guaranty)=>{
                arrKey.push(e.id)
            })
            setListSelectRowKeys(arrKey)
        }
    }, [openModalAssignPI,productItemProps]);
    const columns: TableColumnsType<Guaranty> = [
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
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/guaranties-edit/${record.id}`}>Edit</Link>
                </Space>
            ),
        },
    ];
    const rowSelection: TableRowSelection<Guaranty> = {
        selectedRowKeys:listSelectRowKeys,
        onChange: (selectedRowKeys, selectedRows: Guaranty[]) => {
            const arrKey:number[] = []
            selectedRows.forEach((e:Guaranty)=>{
                arrKey.push(e.id)
            })
            setListSelectRowKeys(arrKey)
            setListSelectRow(selectedRows);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // onSelect: (record, selected, selectedRows) => {
        //     console.log(record, selected, selectedRows);
        //   },
        //   onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        //   },
        getCheckboxProps: (record: Guaranty) => ({
            name:record.name,
           // disabled: modePromotion === 'DEL' ? record.discountRate == undefined : false, // Column configuration not to be checked
        
        }),
    };
    return (
        <div>
            {contextHolder}
            <Modal
                title="Thêm bảo hành"
                open={openModalAssignPI}
                confirmLoading={confirmLoading}
                onCancel={() => setStateOpenModalAssignPI(false)}
                footer=""
            >
                <Flex justify="space-between">
                    <Link to={'/admin/guaranties-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Add
                        </Button>
                    </Link>
                    <Space>
                        <Button
                            onClick={() => {
                                handleSaveGuaranties();
                            }}
                            type="primary"
                            size="large"
                            
                        >
                            Save
                        </Button>
                    </Space>
                </Flex>
                <Table
                loading={confirmLoading}
                    pagination={{ position: ['bottomLeft'], pageSize: 4 }}
                    columns={columns}
                    dataSource={guaranties}
                    rowKey={(record) => record.id}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                />
            </Modal>
        </div>
    );
};

export default ModalAssignGuarantiesProductItem;
