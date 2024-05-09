/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SetStateAction, useEffect } from 'react';

import {
    Button,
    type FormProps,
    Form,
    Input,
    InputNumber,
    Upload,
    Select,
    Space,
    Drawer,
    Switch,
    Col,
    Row,
} from 'antd';
import { notification } from 'antd';
import dayjs from 'dayjs';
type NotificationType = 'success' | 'error';
import { MinusCircleOutlined, PlusOutlined, DownOutlined } from '@ant-design/icons';
import * as guarantyServieces from '@/api/guarantyServices';
import { Product, ProductItem, Category, Guaranty } from '@/type';
import * as productServices from '@/api/productServices';
import type { SelectProps } from 'antd';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import { useAppSelector } from '@/app/hooks';
import { selectCate } from '@/feature/category/cateSlice';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const MAX_COUNT = 2;
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
const optionsSku: SelectProps['options'] = [
    {
        value: 'cm',
        label: 'CM',
    },
    {
        value: 'size',
        label: 'Size',
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
    const [value, setValue] = React.useState<string[]>([]);
    const suffix = (
        <>
            <span>
                {value.length} / {MAX_COUNT}
            </span>
            <DownOutlined />
        </>
    );
    const [optionsGuaranty, setOptionsGuaranty] = React.useState<SelectProps['options']>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
    const [isSize, setIsSize] = React.useState<boolean>(false);
    const categories = useAppSelector(selectCate);
    const [openProductItem, setOpenProductItem] = React.useState(false);
    const [openVariaton, setOpenVariaton] = React.useState(false);
    const [openUploadImages, setOpenUploadImages] = React.useState(false);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const showDrawerProductItem = () => {
        setOpenProductItem(true);
    };
    const showDrawerVariation = () => {
        setOpenVariaton(true);
    };
    const showDrawUploadImages = () => {
        setOpenUploadImages(true);
    };

    const GeneratorSelectOption = (data: Guaranty[]): SelectProps['options'] => {
        const options: SelectProps['options'] = [];
        data.forEach((element: Guaranty) => {
            options.push({
                value: element.id,
                label: element.name,
            });
        });
        return options;
    };
    useEffect(() => {
        const options: SelectProps['options'] = [];
        categories.forEach((element: Category) => {
            if (element.subCategory != undefined) {
                element.subCategory.forEach((e: Category) => {
                    options.push({
                        value: e.id,
                        label: e.name,
                    });
                });
            }
        });
        setOptions(options);
        if (product != undefined) {
            if (product.items.length > 1) {
                setIsSize(true);
            }
        }
        const getAllGuaranty = async () => {
            const res = await guarantyServieces.getAllGuaranty();
            if (res.isSuccessed === true) {
                setOptionsGuaranty(GeneratorSelectOption(res.resultObj));
            }
        };
        getAllGuaranty();
    }, []);
    console.log(product);
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
    const onFinishProductItem = async (values: any) => {
        if (product != undefined) {
            if (isSize === true) {
                const res = await productServices.addProductSize(product.id, values.items);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    setOpenProductItem(false);
                    openNotificationWithIcon('success', 'Add Product item success');
                }
            } else {
                const res = await productServices.addProductNoSize(product.id, values.price, values.stock);
                console.log(product.id);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    setOpenProductItem(false);
                    openNotificationWithIcon('success', 'Add Product item size success');
                }
            }
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
                    label="Product name"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={product?.name}
                    rules={[{ required: true, message: 'Please input product name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Product>
                    name="seoTitle"
                    label="Seo Title"
                    //initialValue={product?.seoTitle}
                    rules={[{ required: true, message: 'Please input seo title' }]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item<Product>
                    name="seoDescription"
                    label="Seo Description"
                    //initialValue={product?.seoDescription}
                    rules={[{ required: true, message: 'Please input seo description' }]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item name="file" label="Upload thumbnail" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload listType="picture-card" maxCount={1}>
                        <button style={{ border: 0, background: 'none' }} type="button">
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </button>
                    </Upload>
                </Form.Item>
                <Form.Item<Product>
                    name="categoryId"
                    label="Category"
                    //initialValue={product?.categoryId}
                    rules={[{ required: true, message: 'Please select categories!' }]}
                >
                    <Select size={'middle'} onChange={handleChange} style={{ width: 200 }} options={options} />
                </Form.Item>
                {typeof product !== 'undefined' ? (
                    <Form.Item<Product>
                        name="status"
                        label="Status"
                        initialValue={1}
                        rules={[{ required: true, message: 'Please select Status!' }]}
                    >
                        <Select
                            size={'middle'}
                            //onChange={handleChange}
                            style={{ width: 200 }}
                            options={optionsProductStatus}
                        />
                    </Form.Item>
                ) : (
                    ''
                )}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading}>
                        Save
                    </Button>
                </Form.Item>
            </Form>

            {product != undefined ? (
                <>
                    <Space>
                        <Button type="primary" onClick={showDrawUploadImages} icon={<PlusOutlined />}>
                            Upload images
                        </Button>
                        <Button type="primary" onClick={showDrawerVariation} icon={<PlusOutlined />}>
                            Config Variation
                        </Button>
                        <Button type="primary" onClick={showDrawerProductItem} icon={<PlusOutlined />}>
                            Config product
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

            <Drawer
                title="Create product item"
                width={650}
                onClose={() => setOpenProductItem(false)}
                open={openProductItem}
            >
                {typeof product !== 'undefined' ? (
                    <>
                        <Switch
                            checked={isSize}
                            checkedChildren="size"
                            unCheckedChildren="No size"
                            onChange={() => {
                                setIsSize(!isSize);
                            }}
                            disabled={product?.items.length > 0}
                        />
                    </>
                ) : (
                    ''
                )}

                <Form
                    {...formItemLayout}
                    name="dynamic_form_nest_item"
                    onFinish={onFinishProductItem}
                    style={{ maxWidth: 600, marginTop: 10 }}
                    autoComplete="off"
                >
                    {isSize === true ? (
                        <Form.List name="items" initialValue={product?.items}>
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'price']}
                                                rules={[{ required: true, message: 'Missing price' }]}
                                            >
                                                <InputNumber
                                                    type="number"
                                                    placeholder="Price"
                                                    min={0}
                                                    style={{ width: 90, marginRight: '5px' }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'stock']}
                                                rules={[{ required: true, message: 'Missing stock' }]}
                                            >
                                                <InputNumber
                                                    type="number"
                                                    placeholder="Stock"
                                                    min={0}
                                                    style={{ width: 50, marginRight: '5px' }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'value']}
                                                rules={[{ required: true, message: 'Missing value' }]}
                                            >
                                                <Input placeholder="value" style={{ width: 50, marginRight: '5px' }} />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'sku']}
                                                rules={[{ required: true, message: 'Missing SKU' }]}
                                            >
                                                <Select
                                                    size={'middle'}
                                                    //onChange={handleChange}
                                                    style={{ width: 70 }}
                                                    options={optionsSku}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'guaranty']}
                                                rules={[{ required: true, message: 'Missing Guaranty' }]}
                                            >
                                                <Select
                                                    mode="multiple"
                                                    maxCount={MAX_COUNT}
                                                    value={value}
                                                    style={{ width: 250 }}
                                                    onChange={setValue}
                                                    suffixIcon={suffix}
                                                    placeholder="Please select"
                                                    options={optionsGuaranty}
                                                />
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
                    ) : (
                        <>
                            <Row>
                                <Col span={8}>
                                    <Form.Item<ProductItem>
                                        name="price"
                                        initialValue={product?.items[0]?.price}
                                        rules={[{ required: true, message: 'Missing price' }]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Price"
                                            min={0}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item<ProductItem>
                                        name="stock"
                                        initialValue={product?.items[0]?.stock}
                                        rules={[{ required: true, message: 'Missing stock' }]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Stock"
                                            min={0}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item
                                        name={'guaranty'}
                                        rules={[{ required: true, message: 'Missing Guaranty' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            maxCount={MAX_COUNT}
                                            value={value}
                                            style={{ width: 250 }}
                                            onChange={setValue}
                                            suffixIcon={suffix}
                                            placeholder="Please select"
                                            options={optionsGuaranty}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </>
                    )}
                    <Form.Item>
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
