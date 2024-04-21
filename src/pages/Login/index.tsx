import React from 'react';
import { Button, Checkbox, Form, type FormProps, Input, Space, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { signIn } from '@/feature/user/userSlice';
import * as loginServices from '@/api/loginServices';
import * as userServices from '@/api/userServices';
import { Result } from '@/api/ResType';
import { Link, useNavigate } from 'react-router-dom';
export type LoginType = {
    email?: string;
    password?: string;
};

function Login() {
    const [error, setError] = React.useState<Result>();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
        const login = async () => {
            const resuft = await loginServices.login(values);
            console.log(resuft)
            if (resuft.statusCode == 200) {
                const token = resuft.resultObj.accessToken;
                localStorage.setItem('accessToken', resuft.resultObj.accessToken);
                //localStorage.setItem('refreshToken', resuft.resultObj.refreshToken);
                const userResuft = await userServices.getUser();
                if (userResuft.isSuccessed == true) {
                    dispatch(signIn(userResuft.resultObj));
                    console.log(userResuft)
                    if (userResuft.resultObj.roles[0] == 'admin') {
                        Navigate('/admin/product');
                    } else if (userResuft.resultObj.roles[0] == 'customer') {
                        Navigate(`/product/all`);
                    } else {
                        setError(userResuft);
                    }
                } else {
                    setError(userResuft);
                }
            } else if (resuft) {
                setError(resuft);
            }
        };
        login();
    };

    const onFinishFailed: FormProps<LoginType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}
        >
            <div>
                {error != undefined ? <Alert message="Error" description={error.message} type="error" showIcon /> : ''}
                <h2 style={{ textAlign: 'center' }}>LOGIN</h2>
                <Form
                    name="basic"
                    style={{ maxWidth: 600, width: 350, maxHeight: 500, marginTop: '15px' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    size="large"
                >
                    <Form.Item<LoginType>
                        name="email"
                        rules={[{ type: 'email', required: true, message: 'Please input your email!' }]}
                    >
                        <Input placeholder="Email" prefix={<UserOutlined />} />
                    </Form.Item>

                    <Form.Item<LoginType>
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Submit
                        </Button>
                        Or <Link to="/auth/register">Register now!</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default Login;
