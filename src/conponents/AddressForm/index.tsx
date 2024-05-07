import React, { SetStateAction, useEffect, useState } from 'react';
import { Button, type FormProps, Form, Input, Select, Space } from 'antd';
import * as userServices from '@/api/userServices'
import * as addressGHTKServices from '@/api/addressGHTKServices'
import { Category } from '@/type';
import  Selected from '@/conponents/AddressForm'
import type { SelectProps } from 'antd';
import type { StatusForm } from '@/pages/Admin/Category/Type';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/feature/user/userSlice';
import { Address, addressGHTK } from '@/api/ResType';
import type { TypeFormAddress } from '@/pages/Purchase';
import { Value } from 'sass';

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
    const [optionsProvince, setOptionsProvince] = React.useState<SelectProps['options']>([]);
    const [optionsDistrict, setOptionsDistrict] = React.useState<SelectProps['options']>([]);
    const [optionsWard, setOptionsWard] = React.useState<SelectProps['options']>([]);
    const [isSize, setIsSize] = React.useState<boolean>(false);
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
                        // console.log(values)
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

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [Roads, setRoads] = useState([])
    const [province, setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [ward, setWard] = useState('')
    const [road, setRoad] = useState('')
    const [reset, setReset] = useState(false)

    const handleChangeProvince = (value: string) => {
        const getAllDistrict  = async()=>{
            const res =await addressGHTKServices.getAllDistrict(Number(value))
            if(res.isSuccessed ===true){
                console.log(res.resultObj)
                const options: SelectProps['options'] = [];
                res.resultObj.forEach((element: addressGHTK) => {
                    options.push({
                        value: element.id,
                        label: element.name,
                    });
                });
                setOptionsDistrict(options);
            }
        }
        getAllDistrict()
    };
    const handleChangeDistrict = (value: string) => {
        const getAllWard  = async()=>{
            const res =await addressGHTKServices.getAllWard(Number(value))
            if(res.isSuccessed ===true){
                console.log(res.resultObj)
                const options: SelectProps['options'] = [];
                res.resultObj.forEach((element: addressGHTK) => {
                    options.push({
                        value: element.id,
                        label: element.name,
                    });
                });
                setOptionsWard(options);
            }
        }
        getAllWard()
    };
    const handleChangeWard = (value: string)=>{
    }
    const handleChangeRoad = (value: string)=>{
    }
    useEffect(() => {
        // getProductPaging(2);
        // getProductPaging(3);
        const getAllProvince  =async()=>{
            const res =await addressGHTKServices.getAllProvince()
            if(res.isSuccessed ===true){
                console.log(res.resultObj)
                const options: SelectProps['options'] = [];
                res.resultObj.forEach((element: addressGHTK) => {
                    options.push({
                        value: element.id,
                        label: element.name,
                    });
                });
                setOptionsProvince(options);
            }
        }
        getAllProvince()
        // getAllDistrict()
        // getAllWard()
        // getAllRoad()
    }, []);
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
                name="province"
                label="Tỉnh/Thành Phố"
                tooltip="What do you want others to call you?"
                //valuePropName={address?.streetNumber}
                //initialValue={''}
                rules={[{ required: true, message: 'Chọn Tỉnh/Thành Phố!', whitespace: true }]}
            >
            <Select
                defaultValue="Chọn Tỉnh/ Thành Phố"
                style={{ width: 200 }}
                onChange={handleChangeProvince}      
                options={optionsProvince}
            />
            </Form.Item>
            <Form.Item<Address>
                name="urbanDistrict"
                label="Quận/ Huyện"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                //initialValue={''}
                rules={[{ required: true, message: 'Chọn Quận/Huyện!', whitespace: true }]}
            >
            <Select
                defaultValue="Chọn Quận/ Huyện"
                style={{ width: 200 }}
                onChange={handleChangeDistrict}      
                options={optionsDistrict}
            />
            </Form.Item>
            <Form.Item<Address>
                name="wardCommune"
                label="Xã/Phường"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                //initialValue={''}
                rules={[{ required: true, message: 'Chọn Xã/Phường!', whitespace: true }]}
            >
            <Select
                defaultValue="Chọn Xã/Phường"
                style={{ width: 200 }}
                onChange={handleChangeWard}      
                options={optionsWard}
            />
            </Form.Item>
            <Form.Item<Address>
                name="streetNumber"
                label="Số Đường"
                tooltip="What do you want others to call you?"
                //valuePropName='name'
                //initialValue={''}
                rules={[{ required: true, message: 'Chọn Số Đường!', whitespace: true }]}
            >
            <Input></Input>
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


