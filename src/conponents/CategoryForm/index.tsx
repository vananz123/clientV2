/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction, useEffect } from 'react';
import { Button, type FormProps, Form, Input, Select, SelectProps } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import { Category } from '@/type';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import { useAppSelector } from '@/app/hooks';
import { selectCate } from '@/feature/category/cateSlice';
import { OPTIONS_STATUS, FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
interface Props {
    category: Category | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}
const CategoryForm: React.FC<Props> = ({ category, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(category);
    const cate = useAppSelector(selectCate);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [optionParent, setOptionParent] = React.useState<SelectProps['options']>([]);
    useEffect(() => {
        const item: SelectProps['options'] = [];
        cate.forEach((e: Category) => {
            item.push({
                label: e.name,
                value: e.id,
            });
        });
        setOptionParent(item);
    }, [category]);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Category>['onFinish'] = async (values) => {
        setIsLoading(true);
        setContext('');
        if (category != undefined) {
            if (category?.id != undefined) {
                values.id = category.id;
                const res = await categoryServices.updateCate(values);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    const status: StatusForm = 'success';
                    onSetStatus(status);
                } else {
                    const status: StatusForm = 'error';
                    onSetStatus(status);
                }
            }
            setIsLoading(false);
            setContext('Save');
        } else {
            const res = await categoryServices.createCate(values);
            if (res.isSuccessed === true) {
                onSetState(res.resultObj);
                const status: StatusForm = 'success';
                onSetStatus(status);
            } else {
                const status: StatusForm = 'error';
                onSetStatus(status);
            }
            setIsLoading(false);
        }
    };

    const onFinishFailed: FormProps<Category>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            {...FORM_ITEM_LAYOUT}
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
                rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<Category> name="parentId" label="Parent">
                <Select
                    size={'middle'}
                    style={{ width: 200 }}
                    options={optionParent}
                />
            </Form.Item>
            {typeof category !== 'undefined'? <Form.Item<Category>
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select Status!' }]}
            >
                <Select
                    size={'middle'}
                    style={{ width: 200 }}
                    options={OPTIONS_STATUS}
                />
            </Form.Item>:''}
            <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                    {context}
                </Button>
            </Form.Item>
        </Form>
    );
};
export default CategoryForm;
