import React, { SetStateAction, useEffect } from 'react';
import { Button, type FormProps, Form, Input } from 'antd';
import * as userServices from '@/api/userServices'
import { Category } from '@/pages/Admin/Product/ProductList';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/feature/user/userSlice';
import { Address } from '@/api/ResType';
import type { TypeFormAddress } from '@/pages/Purchase';
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
const AddressForm: React.FC<{
    typeForm: TypeFormAddress | undefined;
    address: Address | undefined;
    onSetState: SetStateAction<any> | undefined;
    onSetStatus: SetStateAction<any>;
}> = ({typeForm, address, onSetState, onSetStatus }) => {
    const [form] = Form.useForm();
    if(typeForm == 'ADD'){
        form.setFieldValue('streetNumber','')
        form.setFieldValue('phoneNumber','')
        form.setFieldValue('wardCommune','')
        form.setFieldValue('urbanDistrict','')
        form.setFieldValue('city','')
    }else{
        form.setFieldsValue(address)
    }
    const user = useAppSelector(selectUser);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [context, setContext] = React.useState<string>('Save');
    const onFinish: FormProps<Address>['onFinish'] = async(values) => {
        if (typeof user !== 'undefined') {
            setIsLoading(true);
            setContext('');
            if (typeof address === 'undefined') {
                if (typeForm == 'ADD') {
                    values.userId = user.id
                    const res = await userServices.addAddress(values)
                    if (res.statusCode === 200) {
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
            } else{
                if(typeForm =='EDIT'){
                    {
                        values.userId = user.id
                        values.id = address.id
                        console.log(values)
                        const res = await userServices.updateAddress(values)
                        
                        if (res.statusCode === 200) {
                            onSetState(res.resultObj);
                            const status : StatusForm ='success'
                            onSetStatus(status)
                        }else{
                            const status : StatusForm ='error'
                            onSetStatus(status)
                        }
                    }
                }
                setIsLoading(false);
                setContext('Save');
            }
        }
    };

    
    const onFinishFailed: FormProps<Address>['onFinishFailed'] = (errorInfo) => {
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
            <Form.Item<Address>
                name="phoneNumber"
                label="Phone number"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                initialValue={''}
                rules={[{ required: true, message: 'Please input Phone number!', whitespace: true }]}
            >
                <Input value={address?.phoneNumber}/>
            </Form.Item>
            <Form.Item<Address>
                name="streetNumber"
                label="Street number"
                tooltip="What do you want others to call you?"
                //valuePropName={address?.streetNumber}
                initialValue={''}
                rules={[{ required: true, message: 'Please input Street number!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<Address>
                name="wardCommune"
                label="wardCommune"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                initialValue={''}
                rules={[{ required: true, message: 'Please input wardCommune!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<Address>
                name="urbanDistrict"
                label="urbanDistrict"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                initialValue={''}
                rules={[{ required: true, message: 'Please input urbanDistrict!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item<Address>
                name="city"
                label="city"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                initialValue={''}
                rules={[{ required: true, message: 'Please input city!', whitespace: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100px' }}>
                    {context}
                </Button>
            </Form.Item>
        </Form>
    );
};
export default AddressForm;
