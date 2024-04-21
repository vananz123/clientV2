import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined, InfoCircleOutlined, MailOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { signIn } from '@/feature/user/userSlice';
import * as loginServices from '@/api/loginServices';
import * as userServices from '@/api/userServices';
import { Result } from '@/api/ResType';
import { Link, useNavigate } from 'react-router-dom';
export type RegisterUser = {
    email: string;
    name: string;
    address: string;
    password: string;
};

function Register() {
    const [message, setMessage] = React.useState<Result>();
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const onFinish: FormProps<RegisterUser>['onFinish'] = async (values) => {
        console.log(values);
        const register = await userServices.Register(values);
        if(register.statusCode ==201){
            navigator('/auth/login')
        }
        setMessage(register);
    };

    const onFinishFailed: FormProps<RegisterUser>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}
        >
            <div>
                {message != undefined ? (
                    message.error != '' ? (
                        <Alert style={{ maxWidth: 600, width: 350}} message="Error" description={message.message} type="error" showIcon />
                    ) : (
                        <Alert style={{ maxWidth: 600, width: 350}} message="Success" description={<div>{message.message} <Link to={'/auth/login'}>Login now</Link></div>} type="success" showIcon />
                    )
                ) : (
                    ''
                )}

                <Form
                    name="basic"
                    style={{ maxWidth: 600, width: 350, maxHeight: 500, marginTop: '15px' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item<RegisterUser>
                        name="name"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input name!', whitespace: true }]}
                    >
                        <Input placeholder="name" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item<RegisterUser>
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" prefix={<MailOutlined />} />
                    </Form.Item>
                    <Form.Item<RegisterUser>
                        name="address"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input address!', whitespace: true }]}
                    >
                        <Input placeholder="address" prefix={<InfoCircleOutlined />} />
                    </Form.Item>
                    <Form.Item<RegisterUser>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm Password" prefix={<LockOutlined />} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>{' '}
                        Or <Link to="/auth/login">login now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Register;
