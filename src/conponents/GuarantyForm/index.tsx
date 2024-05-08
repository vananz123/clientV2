/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction } from 'react';
import { Button, type FormProps, Form, Input, Select, SelectProps } from 'antd';
import {  Guaranty } from '@/type';
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
const GuarantyForm: React.FC<{ guaranty: Guaranty | undefined; onSetState: SetStateAction<any> | undefined , onSetStatus:SetStateAction<any>}> = ({
    guaranty,
    onSetState,
    onSetStatus,
}) => {
    const [form] = Form.useForm();
    form.setFieldsValue(guaranty)
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context,setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Guaranty>['onFinish'] = (values) => {
        setIsLoading(true);
        setContext('')
        if(guaranty != undefined){
            setTimeout(async () => {
                if (guaranty?.id != undefined) {
                    //Cal api guaranty addGuaranty
                    //const res = await categoryServices.updateCate(category?.id, values);
                    // if (res.statusCode == 200) {
                    //     onSetState(res.resultObj);
                    //     const status : StatusForm ='success'
                    //     onSetStatus(status)
                    // }else{
                    //     const status : StatusForm ='error'
                    //     onSetStatus(status)
                    // }
                }
                setIsLoading(false);
                setContext('Save')
            }, 300);
        }else{
            setTimeout(async () => {
                console.log(values)
                //call api updateGuaranty
                // const res = await categoryServices.createCate(values);
                //     if (res.statusCode == 201) {
                //         onSetState(res.resultObj);
                //         const status : StatusForm ='success'
                //         onSetStatus(status)
                //     }else{
                //         const status : StatusForm ='error'
                //         onSetStatus(status)
                //     }
                // setIsLoading(false);
            }, 300);
        }
    };

    const onFinishFailed: FormProps<Guaranty>['onFinishFailed'] = (errorInfo) => {
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
            <Form.Item<Guaranty>
                name="name"
                label="Guaranty name"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                //initialValue={category?.name}
                rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            
            {/* thêm felds cho form */}
            <Form.Item<Guaranty>
                    name="status"
                    label="Status"
                    initialValue={0}
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
export default GuarantyForm;
