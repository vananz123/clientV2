/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useCallback, useEffect } from 'react';
import * as promotionServices from '@/api/promotionServices';
import * as productServices from '@/api/productServices';
import { ProductItem } from '@/type';
import { Button, Flex, Modal, Space, Table, TableColumnsType } from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { TableRowSelection } from 'antd/es/table/interface';
export type ModePromotionType = 'EDIT' | 'DEL';
import { notification } from 'antd';
import { Promotion } from '@/api/ResType';
import dayjs from 'dayjs';
type NotificationType = 'success' | 'error';
interface Props {
    openModalAssignPI: boolean;
    setStateOpenModalAssignPI: SetStateAction<any>;
    productItemProps: ProductItem | undefined;
    setStateProduct:SetStateAction<any>;
}
const ModalAssginPromotionsProductItem: React.FC<Props> = ({
    openModalAssignPI,
    setStateOpenModalAssignPI,
    productItemProps,setStateProduct,
}) => {
    const [promotions, setPromotions] = React.useState<Promotion[]>([]);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [listSelectRowKeys, setListSelectRowKeys] = React.useState<number[]>([]);
    //const [listSelectRow, setListSelectRow] = React.useState<Guaranty[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const getAllPromotions = async () => {
        const res = await promotionServices.getAllPromotion();
        if (res.isSuccessed === true) {
            setPromotions(res.resultObj);
        }
    };
    const handleSaveGuaranties = async () => {
        setConfirmLoading(true);
        if (productItemProps != undefined) {
            const res = await productServices.assignPromotion( productItemProps?.id,
                promotions.filter((s) => listSelectRowKeys.includes(s.id))
            )
            
            if (res.isSuccessed === true) {
                openNotificationWithIcon('success', 'thêm bảo hành thành công');
                setStateProduct(res.resultObj)
                setConfirmLoading(false);
            } else {
                openNotificationWithIcon('error', 'lỗi');
                setConfirmLoading(false);
            }
        }
    };
    const GenaratorListSelectRowKeys = useCallback(async()=>{
        if (typeof productItemProps !== 'undefined') {
            const res = await promotionServices.getAllPromotionByPI(productItemProps.id)
            const arrKey: number[] = [];
            res.resultObj?.forEach((e: Promotion) => {
                arrKey.push(e.id);
            });
            setListSelectRowKeys(arrKey);
        }
    },[productItemProps])
    useEffect(() => {
        getAllPromotions();
        GenaratorListSelectRowKeys()
    }, [openModalAssignPI,GenaratorListSelectRowKeys]);

    const columns: TableColumnsType<Promotion> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },{
            title: 'value/type',
            dataIndex: 'value',
            key: 'Promotion',
            render:(_,record)=>(
                <p>{record.type == 'fixed' ? `${record.value}VNG`: `${record.value}%`}</p>
            )
        },
        {
            title: 'Mô Tả',
            dataIndex: 'description',
            key: 'description',
        },{
            title: 'Bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            render:(_,record)=>(
                <p>{dayjs(record.startDate).format('YYYY/MM/DD')}</p>
            ),
        },{
            title: 'Kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            render:(_,record)=>(
                <p>{dayjs(record.endDate).format('YYYY/MM/DD')}</p>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/promotion-edit/${record.id}`}>Edit</Link>
                </Space>
            ),
        },
    ];
    const rowSelection: TableRowSelection<Promotion> = {
        selectedRowKeys: listSelectRowKeys,
        onChange: (selectedRowKeys, selectedRows: Promotion[]) => {
            const arrKey: number[] = [];
            selectedRows.forEach((e: Promotion) => {
                arrKey.push(e.id);
            });
            setListSelectRowKeys(arrKey);
            //setListSelectRow(selectedRows);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // onSelect: (record, selected, selectedRows) => {
        //     console.log(record, selected, selectedRows);
        //   },
        //   onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        //   },
        getCheckboxProps: (record: Promotion) => ({
            name: record.name,
            //disabled: listSelectRowKeys.length > 1 ? false : true, // Column configuration not to be checked
        }),
    };
    return (
        <div>
            {contextHolder}
            <Modal
            width={800}
                title="Thêm khuyến mãi"
                open={openModalAssignPI}
                confirmLoading={confirmLoading}
                onCancel={() => setStateOpenModalAssignPI(false)}
                footer=""
            >
                <Flex justify="space-between" style={{ marginBottom: 10 }}>
                    <Link to={'/admin/promotion-add'}>
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
                    pagination={{ position: ['none'] }}
                    columns={columns}
                    dataSource={promotions}
                    rowKey={(record) => record.id}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                />
            </Modal>
        </div>
    );
};

export default ModalAssginPromotionsProductItem;
