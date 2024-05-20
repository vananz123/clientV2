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
} from 'antd';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Product, Category } from '@/type';
import * as productServices from '@/api/productServices';
import type { SelectProps } from 'antd';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import * as categoryServices from "@/api/categoryServices"
import ProductItemConfig from '../ProductItemConfig';
import { FORM_ITEM_LAYOUT,TAIL_FORM_ITEM_LAYOUT ,OPTIONS_PRODUCT_STATUS} from '@/common/common';
import UploadImages from '@/view/product/UploadImages';

const normFile = (e: any) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const ProductForm: React.FC<{
    product: Product | undefined;
    onSetState: SetStateAction<any>;
    onSetStatus: SetStateAction<any>;
}> = ({ product, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(product);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [options, setOptions] = React.useState<SelectProps['options']>([]);
    const [openVariaton, setOpenVariaton] = React.useState(false);
    const [openUploadImage, setUploadImage] = React.useState(false);
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
    const getAllCate  =async ()=>{
        const res  =await categoryServices.getAllCate()
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
    return (
        <div>
            <Row gutter={16}>
                <Col xs={24} xl={12} >
                <Form
                {...FORM_ITEM_LAYOUT}
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
                    <Select size={'middle'} style={{ width: 200 }} options={options} />
                </Form.Item>
                <Form.Item<Product>
                        name="status"
                        label="Trạng Thái"
                        
                        initialValue={1}
                        rules={[{ required: true, message: 'Please select Status!' }]}
                    >
                        <Select
                        disabled={ (product?.items && product.items.length < 1 || typeof product === 'undefined') }
                            size={'middle'}
                            //onChange={handleChange}
                            style={{ width: 200 }}
                            options={OPTIONS_PRODUCT_STATUS}
                        />
                    </Form.Item>
                
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
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
            
            {product != undefined && (
                <>
                    <Space>
                    <Button type="primary" onClick={()=>{setUploadImage(true)}} icon={<PlusOutlined />}>
                            Upload image
                        </Button>
                        <Button type="primary" onClick={showDrawerVariation} icon={<PlusOutlined />}>
                            Config Variation
                        </Button>
                    </Space>
                </>
            )}
            <Drawer title="Create variation" width={600} onClose={() => setOpenVariaton(false)} open={openVariaton}>
                <Form
                    {...FORM_ITEM_LAYOUT}
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
                    <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
            {product != undefined && (
                <UploadImages open={openUploadImage} setOpen={setUploadImage} product={product}/>
            )}
            {contextHolder}
        </div>
    );
};

export default ProductForm;