/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Table,  Space,  Image, Modal, Upload, Button, Flex, Tooltip, Descriptions } from 'antd';
import type {  TableColumnsType, DescriptionsProps } from 'antd';
import {  Drawer,} from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import * as productServices from '@/api/productServices';
import React, { useEffect } from 'react';
import { DeleteOutlined, PlusOutlined, RetweetOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { BaseUrl } from '@/utils/request';
import { TableRowSelection } from 'antd/es/table/interface';
import type { ModePromotionType } from './ModePromotion';
import ModePromotion from './ModePromotion';
import { Product,ProductItem } from '@/type';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

function ProductList() {
    const baseUrl =import.meta.env.VITE_BASE_URL
    const [data, setData] = React.useState<Product[]>();
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [currentProductItem, setCurrentProductItem] = React.useState<Product>();
    const [modal2Open, setModal2Open] = React.useState(false);
    const [confirmLoadinModal2, setConfirmLoadingModal2] = React.useState(false);
    const [openModalModePromotion, setModalModePromotion] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [modePromotion, setModePromotion] = React.useState<ModePromotionType>('EDIT');
    const [listSelectRow, setListSelectRow] = React.useState<Product[]>([]);
    const showDrawer = (id: number) => {
        const loadProductDetail = async () => {
            const res = await productServices.getProductDetail(id);
            if (res.isSuccessed === true) {
                setCurrentProductItem(res.resultObj);
            }
        };
        loadProductDetail();
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
    };
    const loadAllProduct = async () => {
        const res = await productServices.getAllProduct();
        console.log(res);
        if (res.isSuccessed === true) {
        // const arrSort: Product[] = res.resultObj.sort((a: Product, b: Product) => {
        //     let aa = new Date(a.dateCreated).getTime();
        //     let bb = new Date(b.dateCreated).getTime();
        //     return bb - aa;
        // });
            setData(res.resultObj);
        }
    };
    useEffect(() => {
        loadAllProduct();
    }, []);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
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
    const columns: TableColumnsType<Product> = [
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
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (_, record) => (
                <p>{ChangeCurrence(record.price)}</p>
            ),
        },
        {
            title: 'Picture',
            key: 'picture',
            render: (_, record) => (
                <img
                    src={`${baseUrl + record.urlThumbnailImage}`}
                    style={{ width: '100px', height: 'auto', cursor: 'pointer' }}
                    onClick={() => showModalImage(record.urlThumbnailImage, record.id)}
                />
            ),
        },
        {
            title: 'discountRate',
            dataIndex: 'discountRate',
            key: 'discountRate',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'ViewCount',
            dataIndex: 'viewCount',
            key: 'viewCount',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/product-edit/${record.id}`}>Edit</Link>
                    <a onClick={() => showModalDel(record.id, record.name)}>Delete</a>
                    <a onClick={() => showDrawer(record.id)} key={`a-${record.id}`}>
                        View Profile
                    </a>
                </Space>
            ),
        },
    ];
    const desProduct :DescriptionsProps['items']= [
        {
            key: 'Name',
            label: 'Name',
            children: (<span>{currentProductItem?.name}</span>)
        },{
            key: 'Promotion',
            label: 'Promotion',
            children: (<span>{currentProductItem?.valuePromotion}</span>)
        },
    ]
    const rowSelection: TableRowSelection<Product> = {
        onChange: (selectedRowKeys, selectedRows: Product[]) => {
            setListSelectRow(selectedRows);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // onSelect: (record, selected, selectedRows) => {
        //     console.log(record, selected, selectedRows);
        //   },
        //   onSelectAll: (selected, selectedRows, changeRows) => {
        //     console.log(selected, selectedRows, changeRows);
        //   },
        getCheckboxProps: (record: Product) => ({
            disabled: modePromotion === 'DEL' ? record.valuePromotion == undefined : false, // Column configuration not to be checked
            name: record.name,
        }),
    };
    const showModalImage = (url: string, id: number) => {
        //setPreviewImage(`http://${url}`)
        //setPreviewOpen(true)
        setCurrentId(id);
        setModal2Open(true);
    };
    const showModalDel = (id: number, name: string) => {
        setModalText(`Do you want product ${name}!`);
        setCurrentId(id);
        setOpen(true);
    };
    const handleOkDel = async() => {
        setModalText('deleting!');
        setConfirmLoading(true);
        const res = await productServices.deleteProduct(currentId);
            if (res.statusCode == 204) {
                const res = await productServices.getAllProduct();
                if (res.statusCode == 200) {
                    setData(res.resultObj);
                    setConfirmLoading(false);
                    setOpen(false);
                    setFileList([]);
                }
            } else {
                setModalText('error!');
                setConfirmLoading(false);
            }
    };
    const uploadImageAPI = async() => {
        setConfirmLoadingModal2(true);
        const res = await productServices.uploadThumbnailImage(currentId, fileList[0].originFileObj);
            if (res != null) {
                setConfirmLoadingModal2(false);
                setModal2Open(false);
                loadAllProduct();
                setFileList([]);
            }
    };
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/admin/product-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Add
                        </Button>
                    </Link>
                    <Space>
                        {listSelectRow.length > 0 ? (
                            <>
                                {modePromotion === 'EDIT' ? (
                                    <Button 
                                    onClick={()=>{
                                        setModalModePromotion(true)
                                    }}
                                    type="primary" 
                                    icon={<PlusOutlined />} 
                                    size="large">
                                        Edit promotion
                                    </Button>
                                ) : (
                                    <Button onClick={()=>{
                                        setModalModePromotion(true)
                                    }} type="primary" icon={<DeleteOutlined />} size="large">
                                        Del
                                    </Button>
                                )}
                            </>
                        ) : (
                            ''
                        )}

                        <Tooltip title="Promotion">
                            <Button
                                onClick={() => {
                                    modePromotion === 'EDIT' ? setModePromotion('DEL') : setModePromotion('EDIT');
                                }}
                                type="primary"
                                icon={<RetweetOutlined />}
                                size="large"
                            >
                                {`Mode: ${modePromotion}`}
                            </Button>
                        </Tooltip>
                    </Space>

                    {/* <SearchC typeSearch={1} onSetState={setData} /> */}
                </Flex>
                <Table
                    rowKey={(record) => record.id}
                    rowSelection={{ type: 'checkbox', ...rowSelection }}
                    pagination={{ position: ['bottomLeft'], pageSize: 4 }}
                    columns={columns}
                    dataSource={data}
                />
            </Space>

            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={openDrawer}>
                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    User Profile
                </p>
                <Descriptions title="Product profile" items={desProduct}  />
            </Drawer>
            <Modal
                title="Upload image"
                centered
                confirmLoading={confirmLoadinModal2}
                open={modal2Open}
                onOk={() => uploadImageAPI()}
                onCancel={() => setModal2Open(false)}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={1}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </Modal>
            <Modal
                title="Delete"
                open={open}
                onOk={handleOkDel}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}
            >
                <p>{modalText}</p>
            </Modal>
            <ModePromotion open={openModalModePromotion} setStateData={setData} setStateOpen={setModalModePromotion} modePromotion={modePromotion} listSelectRow={listSelectRow}/>
        </div>
    );
}

export default ProductList;
