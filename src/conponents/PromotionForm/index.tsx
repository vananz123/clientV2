import React, { SetStateAction } from 'react';
import { Button, type FormProps, Form, Input, InputNumber, DatePicker } from 'antd';
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
        
        values.startDate = dayjs(values.arrDate[0]).format()
        values.endDate = dayjs(values.arrDate[1]).format()
        
        setIsLoading(true);
        setContext('');
        console.log(values)
        if (promotion != undefined) {
            setTimeout(async () => {
                values.id = promotion?.id
                if (promotion?.id != undefined) {
                    const res = await promotionServices.UpdatePromotion(values);
                    if (res.isSuccessed === true) {
                        onSetState(res.resultObj);
                        const status : StatusForm ='success'
                        onSetStatus(status)
                    }else{
                        const status : StatusForm ='error'
                        onSetStatus(status)
                    }
                }
                setIsLoading(false);
                setContext('Save');
            }, 300);
        } else {
            setTimeout(async () => {
                const res = await promotionServices.CreatePromotion(values);
                console.log(res)
                    if (res.isSuccessed === true) {
                        onSetState(res.resultObj);
                        const status : StatusForm ='success'
                        onSetStatus(status)
                    }else{
                        const status : StatusForm ='error'
                        onSetStatus(status)
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
                name="productFrom"
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
                    rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Promotion>
                    name="seoTitle"
                    label="Seo Title"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoTitle}
                    rules={[{ required: true, message: 'Please input category name!', whitespace: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Promotion>
                    name="seoDescription"
                    label="Seo Description"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.seoDescription}
                    rules={[{ required: true, message: 'Please input category name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item<Promotion>
                    name="discountRate"
                    label="Discount Rate"
                    tooltip="What do you want others to call you?"
                    //valuePropName='name'
                    //initialValue={promotion?.discountRate}
                    rules={[{ required: true, message: 'Please input Discount Rate!' }]}
                >
                    <InputNumber type="number" max={100} min={1} />
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
