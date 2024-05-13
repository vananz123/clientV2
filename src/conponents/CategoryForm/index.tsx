import React, { SetStateAction, useEffect } from 'react';
import { Button, type FormProps, Form, Input, Select, SelectProps } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import { Category } from '@/type';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import {  useAppSelector } from '@/app/hooks';
import { selectCate } from '@/feature/category/cateSlice';
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
const optionstStatus: SelectProps['options'] = [
    {
        value: 0,
        label: 'Active',
    },
    {
        value: 1,
        label: 'InActive',
    },
    {
        value: 2,
        label: 'UnActive',
    }
];
const CategoryForm: React.FC<{ category: Category | undefined; onSetState: SetStateAction<any> | undefined , onSetStatus:SetStateAction<any>}> = ({
    category,
    onSetState,
    onSetStatus,
}) => {
    const [form] = Form.useForm();
    form.setFieldsValue(category)
    const cate = useAppSelector(selectCate)
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [optionParent,setOptionParent] = React.useState<SelectProps['options']>([])
    useEffect(()=>{
        const item :SelectProps['options']= []
        cate.forEach((e:Category)=>{
            item.push({
                label:e.name,
                value:e.id,
            })
        })
        setOptionParent(item)
    },[category])
    const [context,setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Category>['onFinish'] =async (values) => {
        setIsLoading(true);
        setContext('')
        if(category != undefined){
            if (category?.id != undefined) {
                const res = await categoryServices.updateCate(category?.id.toString(), values);
                if (res.statusCode == 200) {
                    onSetState(res.resultObj);
                    const status : StatusForm ='success'
                    onSetStatus(status)
                }else{
                    const status : StatusForm ='error'
                    onSetStatus(status)
                }
            }
            setIsLoading(false);
            setContext('Save')
        }else{
            const res = await categoryServices.createCate(values);
            if (res.statusCode == 201) {
                onSetState(res.resultObj);
                const status : StatusForm ='success'
                onSetStatus(status)
            }else{
                const status : StatusForm ='error'
                onSetStatus(status)
            }
        setIsLoading(false);
        }
    };

    const onFinishFailed: FormProps<Category>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="productFrom"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ maxWidth: 600 }}
            scrollToFirstError
        >
            <Form.Item<Category>
                name="name"
                label="Category name"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                //initialValue={category?.name}
                rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<Category>
                    name='parentId'
                    label="Parent"
                    rules={[{ required: true, message: 'Please select Parent!' }]}
                >
                    <Select
                        size={'middle'}
                        //onChange={handleChange}
                        style={{ width: 200 }}
                        options={optionParent}
                    />
                </Form.Item>
            <Form.Item<Category>
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: 'Please select Status!' }]}
                >
                    <Select
                        size={'middle'}
                        //onChange={handleChange}
                        style={{ width: 200 }}
                        options={optionstStatus}
                    />
                </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{width:'100px'}}>
                    {context}
                </Button>
            </Form.Item>
        </Form>
    );
};
export default CategoryForm;
