import React, { SetStateAction, useEffect, useState } from 'react';
import {
    AutoComplete,
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
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Product, ProductItem } from '@/pages/Admin/Product/ProductList';
import * as productServices from '@/api/productServices';
import type { SelectProps } from 'antd';
import { Category } from '@/pages/Admin/Product/ProductList';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import { useAppSelector } from '@/app/hooks';
import { selectCate } from '@/feature/category/cateSlice';
import { Image } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

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

let optionsProductStatus: SelectProps['options'] = [
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
    },
];
let optionsSku: SelectProps['options'] = [
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
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
    const [isSize, setIsSize] = React.useState<boolean>(false);
    const categories = useAppSelector(selectCate);
    const [openProductItem, setOpenProductItem] = React.useState(false);
    const [openVariaton, setOpenVariaton] = React.useState(false);
    const [openUploadImages, setOpenUploadImages] = React.useState(false);
    const showDrawerProductItem = () => {
        setOpenProductItem(true);
    };
    const showDrawerVariation = () => {
        setOpenVariaton(true);
    };
    const showDrawUploadImages = () => {
        setOpenUploadImages(true);
    };
    useEffect(() => {
        let options: SelectProps['options'] = [];
        categories.forEach((element: Category) => {
            options.push({
                value: element.id,
                label: element.name,
            });
        });
        setOptions(options);
        if (product != undefined) {
            if (product.items.length > 1) {
                setIsSize(true);
            }
        }
    }, []);
    console.log(product);
    const handleChange = (value: string[]) => {
        console.log(`Selected: ${value}`);
    };
    const onFinish: FormProps<Product>['onFinish'] = (values) => {
        setIsLoading(true);
        if (product != undefined) {
            setTimeout(async () => {
                const res = await productServices.updateProduct(product.id, values);
                if (res.statusCode == 200) {
                    if (values.file != undefined) {
                        await productServices.uploadImage(res.resultObj.id, values.file[0].originFileObj);
                    }
                    const status: StatusForm = 'success';
                    onSetState(res.resultObj);
                    onSetStatus(status);
                } else {
                    const status: StatusForm = 'error';
                    onSetStatus(status);
                }
                setIsLoading(false);
            }, 1000);
        } else {
            setTimeout(async () => {
                const res = await productServices.addProduct(values);
                if (res.statusCode == 201) {
                    if (values.file != undefined) {
                        await productServices.uploadThumbnailImage(res.resultObj, values.file[0].originFileObj);
                    }
                    const status: StatusForm = 'success';
                    onSetState(res.resultObj);
                    onSetStatus(status);
                } else {
                    const status: StatusForm = 'error';
                    onSetStatus(status);
                }
                setIsLoading(false);
            }, 1000);
        }
    };
    const onFinishVariation = (values: any) => {
        //console.log( values);
        if (product != undefined) {
            setTimeout(async () => {
                const res = await productServices.addVariation(product.id, values.variations);
                if (res.isSuccessed == true) {
                    alert('thanh cong');
                }
            }, 500);
        }
    };
    const onFinishProductItem = (values: any) => {
        //console.log( values)
        if (product != undefined) {
            if (isSize == true) {
                setTimeout(async () => {
                    const res = await productServices.addProductSize(product.id, values.items);
                    if (res.isSuccessed == true) {
                        alert('thanh cong');
                    }
                }, 500);
            } else {
                setTimeout(async () => {
                    const res = await productServices.addProductNoSize(product.id, values.price, values.stock);
                    if (res.isSuccessed == true) {
                        setIsSize(false);
                        alert('thanh cong');
                    }
                }, 500);
            }
        }
    };
    const onFinishFailed: FormProps<Product>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onFinishUploadImages = (values:any)=>{
        if(product!= undefined){
            if(values.file != undefined){
                setTimeout(async () => {
                    const res = await productServices.uploadImage(product.id, values.file);
                    if (res.isSuccessed == true) {
                        alert('thanh cong');
                    }
                }, 500);
            }
        }
    }
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
                    initialValue={product?.name}
                    rules={[{ required: true, message: 'Please input product name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Product>
                    name="seoTitle"
                    label="Seo Title"
                    initialValue={product?.seoTitle}
                    rules={[{ required: true, message: 'Please input seo title' }]}
                >
                    <Input.TextArea showCount maxLength={100} />
                </Form.Item>
                <Form.Item<Product>
                    name="seoDescription"
                    label="Seo Description"
                    initialValue={product?.seoDescription}
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
                    initialValue={product?.categoryId}
                    rules={[{ required: true, message: 'Please select categories!' }]}
                >
                    <Select size={'middle'} onChange={handleChange} style={{ width: 200 }} options={options} />
                </Form.Item>
                <Form.Item<Product>
                    name="status"
                    label="Status"
                    initialValue={product?.status}
                    rules={[{ required: true, message: 'Please select Status!' }]}
                >
                    <Select
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

            {product != undefined ? (
                <>
                    <Button type="primary" onClick={showDrawUploadImages} icon={<PlusOutlined />}>
                        Upload images
                    </Button>
                    <Button type="primary" onClick={showDrawerVariation} icon={<PlusOutlined />}>
                        Add Variation
                    </Button>
                    <Button type="primary" onClick={showDrawerProductItem} icon={<PlusOutlined />}>
                        Add Product Size
                    </Button>
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
                width={600}
                onClose={() => setOpenProductItem(false)}
                open={openProductItem}
            >
                <Switch
                    checked={isSize}
                    checkedChildren="size"
                    unCheckedChildren="No size"
                    onChange={() => {
                        setIsSize(!isSize);
                    }}
                    disabled={product?.items != null && product.items.length > 0}
                />
                <Form
                    {...formItemLayout}
                    name="dynamic_form_nest_item"
                    onFinish={onFinishProductItem}
                    style={{ maxWidth: 600, marginTop: 10 }}
                    autoComplete="off"
                >
                    {isSize == true ? (
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
                                                    style={{ width: 150 }}
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
                                                    style={{ width: 100 }}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'value']}
                                                rules={[{ required: true, message: 'Missing value' }]}
                                            >
                                                <Input placeholder="value" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'sku']}
                                                rules={[{ required: true, message: 'Missing SKU' }]}
                                            >
                                                <Select
                                                    size={'middle'}
                                                    //onChange={handleChange}
                                                    style={{ width: 100 }}
                                                    options={optionsSku}
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
                                <Col span={12}>
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
                                <Col span={12}>
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
        </div>
    );
};

export default ProductForm;
