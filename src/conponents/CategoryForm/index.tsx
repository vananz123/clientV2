import React, { SetStateAction } from 'react';
import { Button, type FormProps, Form, Input } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import { Category } from '@/pages/Admin/Product/ProductList';
import type { StatusForm } from '@/pages/Admin/Category/Type';
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
const CategoryForm: React.FC<{ category: Category | undefined; onSetState: SetStateAction<any> | undefined , onSetStatus:SetStateAction<any>}> = ({
    category,
    onSetState,
    onSetStatus,
}) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context,setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Category>['onFinish'] = (values) => {
        setIsLoading(true);
        setContext('')
        if(category != undefined){
            setTimeout(async () => {
                if (category?.id != undefined) {
                    const res = await categoryServices.updateCate(category?.id, values);
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
            }, 500);
        }else{
            setTimeout(async () => {
                const res = await categoryServices.addCate(values);
                    if (res.statusCode == 201) {
                        onSetState(res.resultObj);
                        const status : StatusForm ='success'
                        onSetStatus(status)
                    }else{
                        const status : StatusForm ='error'
                        onSetStatus(status)
                    }
                setIsLoading(false);
            }, 500);
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
                initialValue={category?.name}
                rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
            >
                <Input />
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
