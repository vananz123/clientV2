import React, { SetStateAction } from 'react';
import { Button, type FormProps, Form, Input, InputNumber, DatePicker, Select } from 'antd';
import * as promotionServices from '@/api/promotionServices';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import { Promotion } from '@/api/ResType';
import type { DatePickerProps } from 'antd';
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

const SelectOptionPromotionType = [{ label: 'percentage', value: 'percentage' },{ label: 'fixed', value: 'fixed' }];

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
const { RangePicker } = DatePicker;
const PromotionForm: React.FC<{
    promotion: Promotion | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}> = ({ promotion, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    form.setFieldsValue(promotion);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Promotion>['onFinish'] = (values) => {
        values.startDate = dayjs(values.arrDate[0]).format();
        values.endDate = dayjs(values.arrDate[1]).format();

        setIsLoading(true);
        setContext('');
        if (promotion != undefined) {
            setTimeout(async () => {
                values.id = promotion?.id;
                if (promotion?.id != undefined) {
                    const res = await promotionServices.UpdatePromotion(values);
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
            }, 300);
        } else {
            setTimeout(async () => {
                const res = await promotionServices.CreatePromotion(values);
                console.log(res);
                if (res.isSuccessed === true) {
                    onSetState(res.resultObj);
                    const status: StatusForm = 'success';
                    onSetStatus(status);
                } else {
                    const status: StatusForm = 'error';
                    onSetStatus(status);
                }
                setIsLoading(false);
            }, 200);
        }
    };

    const onFinishFailed: FormProps<Promotion>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                {...formItemLayout}
                form={form}
                name="promotionForm"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item<Promotion>
                    name="name"
                    label="Name"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.name}
                    rules={[{ required: true, message: 'Please input promotion name!'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Promotion>
                    name="description"
                    label="Mô Tả"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input promotion decription!'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Promotion>
                    name="value"
                    label="Value Promotion"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoDescription}
                    // rules={[{ required: true, message: 'Please input promotion value!' }]}
                    dependencies={['type']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('type') === 'percentage') {
                                        if(value > 100){
                                            return Promise.reject(new Error('The new type that you entered do not match!'));        
                                        }
                                        else return Promise.resolve();
                                        
                                    }
                                    return Promise.resolve();
                                },
                            }),
                        ]}
                >
                    <InputNumber  />
                </Form.Item>
                <Form.Item<Promotion>
                    name="type"
                    label="Type Discount"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    initialValue={"fixed"}
                    rules={[{ required: true, message: 'Please input type Discount !' }]}
                >
                     <Select
                            size={'middle'}
                            //onChange={handleChange}
                            style={{ width: 150 }}
                            options={SelectOptionPromotionType}
                            maxCount={1}
                        />
                </Form.Item>
                <Form.Item
                    name={'arrDate'}
                    label="Date"
                    //initialValue={promotion?.arrDate}
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <RangePicker />
                </Form.Item>
                {/* <Form.Item<Promotion>
                    name='startDate'
                 label="DatePicker"
                 rules={[{ required: true, message: 'Please input category name!' }]}
                 >
              <DatePicker/>
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
export default PromotionForm;
