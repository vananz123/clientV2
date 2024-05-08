/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction } from 'react';
import { Button, type FormProps, Form, Input, Select, SelectProps, InputNumber, DatePicker } from 'antd';
import { Guaranty } from '@/type';
import * as guarantyServieces from '@/api/guarantyServices';
import type { Dayjs } from 'dayjs';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import dayjs from 'dayjs';
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

        // values.dateCreated = dayjs(values.arrDate[0]).format()
        // values.dateModify = dayjs(values.arrDate[1]).format()
        values.dateModify = dayjs(values.dateModify).format()

        setIsLoading(true);
        setContext('')
        if(guaranty != undefined){
            setTimeout(async () => {
                if (guaranty?.id != undefined) {
                    //Call api guaranty addGuaranty
                    const res = await guarantyServieces.updateGuaranty(guaranty?.id.toString(),values);
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
            }, 300);
        }else{
            setTimeout(async () => {
                console.log(values)
                //call api updateGuaranty
                const res = await guarantyServieces.createGuaranty(values);
                    if (res.statusCode == 201) {
                        onSetState(res.resultObj);
                        const status : StatusForm ='success'
                        onSetStatus(status)
                    }else{
                        const status : StatusForm ='error'
                        onSetStatus(status)
                    }
                setIsLoading(false);
            }, 300);
        }
    };

    const onFinishFailed: FormProps<Guaranty>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                {...formItemLayout}
                form={form}
                name="guarantyForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item<Guaranty>
                    name="name"
                    label="Name"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.name}
                    rules={[{ required: true, message: 'Please input guaranty name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="sku"
                    label="Seo sku"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="period"
                    label="Period"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="description"
                    label="Description"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoDescription}
                    rules={[{ required: true, message: 'Please input guaranty description!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
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
                <Form.Item<Guaranty>
                    name='dateModify'
                    label="DateModify"
                    rules={[{ required: true, message: 'Please input category name!' }]}
                 >
                    <DatePicker/>
                </Form.Item>
                {/* <Form.Item
                    name={'arrDate'}
                    label="Date"
                    //initialValue={promotion?.arrDate}
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <RangePicker />
                </Form.Item> */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                        {context}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default GuarantyForm;
