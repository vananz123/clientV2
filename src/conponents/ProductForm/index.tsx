/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction, useEffect } from 'react';

import {
    Button,
    type FormProps,
    Form,
    Input,
    Upload,
    Select,
    Space,
    Drawer,
    Col,
    Row,
    Skeleton,
} from 'antd';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
import { MinusCircleOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Product, ProductItem, Category } from '@/type';
import * as productServices from '@/api/productServices';
import type { SelectProps } from 'antd';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import * as categoryServices from "@/api/categoryServices"
import type { GetProp, UploadFile, UploadProps } from 'antd';
import ProductItemConfig from '../ProductItemConfig';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const optionsProductStatus: SelectProps['options'] = [
    {
        value: 0,
        label: 'InActive',
    },
    {
        value: 1,
        label: 'Active',
    },
    {
        value: 2,
        label: 'New',
    },
    {
        value: 3,
        label: 'Hot',
    },
    {
        value: 4,
        label: 'Sale',
        disabled: true,
    },
    {
        value: 5,
        label: 'UnActive',
    },
];
const ProductForm: React.FC<{
    product: Product | undefined;
    onSetState: SetStateAction<any>;
    onSetStatus: SetStateAction<any>;
}> = ({ product, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    form.setFieldsValue(product);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
    const [openVariaton, setOpenVariaton] = React.useState(false);
    const [openUploadImages, setOpenUploadImages] = React.useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const showDrawerVariation = () => {
        setOpenVariaton(true);
    };
    const showDrawUploadImages = () => {
        setOpenUploadImages(true);
    };
    const getAllCate  =async ()=>{
        const res  =await categoryServices.getAllCate("all")
        const options: SelectProps['options'] = [];
        res.resultObj.forEach((e: Category) => {
            options.push({
                value: e.id,
                label: e.name,
            });
        });
        setOptions(options)
    }
    useEffect(() => {
        getAllCate()
    }, []);
    const handleChange = (value: string[]) => {};
    const onFinish: FormProps<Product>['onFinish'] = async (values) => {
        setIsLoading(true);
        if (product != undefined) {
            const res = await productServices.updateProduct(product.id, values);
            if (res.statusCode == 200) {
                if (values.file != undefined) {
                    await productServices.uploadThumbnailImage(res.resultObj.id, values.file[0].originFileObj);
                }
                const status: StatusForm = 'success';
                onSetState(res.resultObj);
                onSetStatus(status);
                openNotificationWithIcon('success', 'Add Product success');
            } else {
                const status: StatusForm = 'error';
                onSetStatus(status);
                openNotificationWithIcon('error', 'Add Product error');
            }
            setIsLoading(false);
        } else {
            const res = await productServices.addProduct(values);
            console.log(values)
            if (res.statusCode == 201) {
                if (values.file != undefined) {
                    console.log(values.file);
                    await productServices.uploadThumbnailImage(res.resultObj.id, values.file[0].originFileObj);
                }
                const status: StatusForm = 'success';
                onSetState(res.resultObj);
                onSetStatus(status);
            } else {
                const status: StatusForm = 'error';
                onSetStatus(status);
            }
            setIsLoading(false);
        }
    };
    const onFinishVariation = (values: any) => {
        //console.log( values);
        if (product != undefined) {
            setTimeout(async () => {
                const res = await productServices.addVariation(product.id, values.variations);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    setOpenVariaton(false);
                    openNotificationWithIcon('success', 'Add variation success');
                }
            }, 300);
        }
    };
    const onFinishFailed: FormProps<Product>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishUploadImages = (values: any) => {
        console.log(values);
        if (product != undefined) {
            if (values.file != undefined) {
                setTimeout(async () => {
                    const res = await productServices.uploadImage(product.id, values.file);
                    if (res.isSuccessed == true) {
                        setOpenUploadImages(false);
                        openNotificationWithIcon('success', 'Add Image success');
                    }
                }, 300);
            }
        }
    };
    return (
        <div>
            <Row gutter={16}>
                <Col xs={24} xl={12} >
                <Form
                {...formItemLayout}
                form={form}
                name="productFrom"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item<Product>
                    name="name"
                    label="Tên sản phẩm"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={product?.name}
                    rules={[{ required: true, message: 'Please input product name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Product>
                    name="seoTitle"
                    label="Tiêu đề"
                    //initialValue={product?.seoTitle}
                    rules={[{ required: true, message: 'Please input seo title' }]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item<Product>
                    name="seoDescription"
                    label="Mô Tả"
                    //initialValue={product?.seoDescription}
                    rules={[{ required: true, message: 'Please input seo description' }]}
                >
                    <Input.TextArea showCount maxLength={500} />
                </Form.Item>
                <Form.Item name="file" label="Ảnh Nền" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload listType="picture-card" maxCount={1}>
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item<Product>
                    name="categoryId"
                    label="Loại Sản Phẩm"
                    //initialValue={product?.categoryId}
                    rules={[{ required: true, message: 'Please select categories!' }]}
                >
                    <Select size={'middle'} onChange={handleChange} style={{ width: 200 }} options={options} />
                </Form.Item>
                <Form.Item<Product>
                        name="status"
                        label="Trạng Thái"
                        
                        initialValue={1}
                        rules={[{ required: true, message: 'Please select Status!' }]}
                    >
                        <Select
                        disabled={ (product?.items?.length < 1 || typeof product === 'undefined') }
                            size={'middle'}
                            //onChange={handleChange}
                            style={{ width: 200 }}
                            options={optionsProductStatus}
                        />
                    </Form.Item>
                
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>
                </Col>
                <Col xs={24} xl={12}>
                    <ProductItemConfig product={product}  productItem={product?.items} onSetState={onSetState}/>
                </Col>
            </Row>
            

            {product != undefined ? (
                <>
                    <Space>
                        <Button type="primary" onClick={showDrawUploadImages} icon={<PlusOutlined />}>
                            Upload images
                        </Button>
                        <Button type="primary" onClick={showDrawerVariation} icon={<PlusOutlined />}>
                            Config Variation
                        </Button>
                    </Space>
                </>
            ) : (
                ''
            )}
            <Drawer
                title="Upload images"
                width={600}
                onClose={() => setOpenUploadImages(false)}
                open={openUploadImages}
            >
                <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinishUploadImages}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.Item name="file" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload listType="picture-card">
                            <button style={{ border: 0, background: 'none' }} type="button">
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Upload</div>
                            </button>
                        </Upload>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            <Drawer title="Create variation" width={600} onClose={() => setOpenVariaton(false)} open={openVariaton}>
                <Form
                    {...formItemLayout}
                    name="dynamic_form_nest_item"
                    onFinish={onFinishVariation}
                    style={{ maxWidth: 600 }}
                    autoComplete="off"
                >
                    <Form.List name="variations" initialValue={product?.variation}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'name']}
                                            rules={[{ required: true, message: 'Missing name' }]}
                                        >
                                            <Input placeholder="Name" style={{ width: 220 }} />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            rules={[{ required: true, message: 'Missing value' }]}
                                        >
                                            <Input placeholder="Value" style={{ width: 220 }} />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                                        Add field
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            {contextHolder}
        </div>
    );
};

export default ProductForm;
