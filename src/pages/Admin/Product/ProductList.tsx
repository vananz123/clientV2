import { Table, Input, Space, Pagination, Image, Modal, Upload, Button, Flex } from 'antd';
import type { TableProps } from 'antd';
import { Avatar, Col, Divider, Drawer, List, Row } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import * as productServices from '@/api/productServices';
import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import SearchC from '@/conponents/SearchC';
import { Link } from 'react-router-dom';
import type { BaseUrl } from '@/utils/request';
export type Category = {
    id: string;
    name: string;
    isShow: true;
    seoDescription: string;
    seoTitle: string;
    urlImage: string;
    status: number;
};
export type ProductItem = {
    id: number;
    productId: number;
    price: number;
    priceBeforeDiscount: number;
    discountRate: number;
    stock: number;
    sku: string;
    isMulti: boolean;
    urlImage: string;
    status: number;
    dateCreated: string;
    dateModify: string;
    name: string;
    value: string;
};
export type Variation = {
    id: number;
    name: string;
    value: string;
};
export type Product = {
    id: number;
    name: string;
    categoryId: number;
    seoDescription: string;
    discountRate:number;
    price:number;
    priceBeforeDiscount:number;
    seoTitle: string;
    seoAlias: string;
    file:any;
    urlThumbnailImage: string;
    viewCount: number;
    status: number;
    dateCreated: string;
    dateModify: string;
    items: ProductItem[];
    variation: Variation[];
};
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
interface DescriptionItemProps {
    title: string;
    content: React.ReactNode;
}

const DescriptionItem = ({ title, content }: DescriptionItemProps) => {
    return <div className="site-description-item-profile-wrapper">
        <p className="site-description-item-profile-p-label">{title}:</p>
        {content}
    </div>
};
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
function ProductList() {
    const baseUrl: BaseUrl = 'https://localhost:7005';
    const [data, setData] = React.useState<Product[]>();
    const [currentId, setCurrentId] = React.useState<number>(0);
    const [currentProductItem, setCurrentProductItem] = React.useState<Product>();
    const [modal2Open, setModal2Open] = React.useState(false);
    const [confirmLoadinModal2, setConfirmLoadingModal2] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [previewOpen, setPreviewOpen] = React.useState(false);
    const [previewImage, setPreviewImage] = React.useState('');
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const [openDrawer, setOpenDrawer] = React.useState(false);
    const showDrawer = (id: number) => {
        const loadProductDetail = async () => {
            const res = await productServices.getProductDetail(id);
            if (res.isSuccessed == true) {
                setCurrentProductItem(res.resultObj);
            }
        };
        loadProductDetail();
        setOpenDrawer(true);
    };

    const onClose = () => {
        setOpenDrawer(false);
    };

    useEffect(() => {
        const loadAllProduct = async () => {
            const res = await productServices.getAllProduct();
            console.log(res);
            if (res.isSuccessed == true) {
                const arrSort: Product[] = res.resultObj.sort((a: Product, b: Product) => {
                    let aa = new Date(a.dateCreated).getTime();
                    let bb = new Date(b.dateCreated).getTime();
                    return bb - aa;
                });
                setData(arrSort);
            }
        };
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

    const columns: TableProps<Product>['columns'] = [
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
            title: 'CategoryName',
            dataIndex: 'categoryName',
            key: 'categoryName',
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
    const handleOkDel = () => {
        setModalText('deleting!');
        setConfirmLoading(true);
        setTimeout(async () => {
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
        }, 500);
    };
    const uploadImageAPI = () => {
        setConfirmLoadingModal2(true);
        // setTimeout(async () => {
        //     const res = await productServices.uploadImage(currentId, fileList[0].originFileObj);
        //     if (res != null) {
        //         setConfirmLoadingModal2(false);
        //         setModal2Open(false);
        //         const res = await productServices.getAllProduct();
        //         if (res.statusCode == 200) {
        //             setData(res.resultObj);
        //             setFileList([]);
        //         }
        //     }
        // }, 1000);
    };
    console.log(fileList);
    return (
        <div>
            <Space direction="vertical" style={{ width: '100%' }}>
                <Flex justify="space-between">
                    <Link to={'/admin/product-add'}>
                        <Button type="primary" icon={<PlusOutlined />} size="large">
                            Add
                        </Button>
                    </Link>
                    <SearchC typeSearch={1} onSetState={setData} />
                </Flex>
                <Table pagination={{ position: ['bottomLeft'], pageSize: 4 }} columns={columns} dataSource={data} />
            </Space>

            <Drawer width={640} placement="right" closable={false} onClose={onClose} open={openDrawer}>
                <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                    User Profile
                </p>
                <p className="site-description-item-profile-p">Personal</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Full Name" content="Lily" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Account" content="AntDesign@example.com" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="City" content="HangZhou" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Country" content="China🇨🇳" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Birthday" content="February 2,1900" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Website" content="-" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem title="Message" content="Make things as simple as possible but no simpler." />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Company</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Position" content="Programmer" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Responsibilities" content="Coding" />
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Department" content="XTech" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Supervisor" content={<a>Lin</a>} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Skills"
                            content="C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc."
                        />
                    </Col>
                </Row>
                <Divider />
                <p className="site-description-item-profile-p">Contacts</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Email" content="AntDesign@example.com" />
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Phone Number" content="+86 181 0000 0000" />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <DescriptionItem
                            title="Github"
                            content={
                                <a href="http://github.com/ant-design/ant-design/">github.com/ant-design/ant-design/</a>
                            }
                        />
                    </Col>
                </Row>
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
        </div>
    );
}

export default ProductList;
