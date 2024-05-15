/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SetStateAction } from 'react';
import { Button, type FormProps, Form, Input, Select, InputNumber } from 'antd';
import { Guaranty ,StatusForm} from '@/type';
import * as guarantyServieces from '@/api/guarantyServices';
import { FORM_ITEM_LAYOUT, TAIL_FORM_ITEM_LAYOUT } from '@/common/common';
import { OPTIONS_STATUS } from '@/common/common';
interface Props {
    guaranty: Guaranty | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}
const GuarantyForm: React.FC<Props> = ({ guaranty, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(guaranty);
    console.log(guaranty);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Guaranty>['onFinish'] = async (values) => {
        setIsLoading(true);
        setContext('');
        if (guaranty != undefined) {
            if (guaranty?.id != undefined) {
                values.id = guaranty.id;
                const res = await guarantyServieces.updateGuaranty(values);
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
            const res = await guarantyServieces.createGuaranty(values);
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

    const onFinishFailed: FormProps<Guaranty>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                {...FORM_ITEM_LAYOUT}
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
                    rules={[{ required: true, message: 'Please input guaranty name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="sku"
                    label="Seo sku"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input guaranty name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="period"
                    label="Period"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input guaranty name!' }]}
                >
                    <InputNumber max={36} min={0} type="number" />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="description"
                    label="Description"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoDescription}
                    rules={[{ required: true, message: 'Please input guaranty description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Guaranty>
                    name="status"
                    label="Status"
                    initialValue={0}
                    rules={[{ required: true, message: 'Please select Status!' }]}
                >
                    <Select size={'middle'} style={{ width: 200 }} options={OPTIONS_STATUS} />
                </Form.Item>
                <Form.Item {...TAIL_FORM_ITEM_LAYOUT}>
                    <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                        {context}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default GuarantyForm;
