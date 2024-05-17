import React from 'react';
import { Button, Form, type FormProps, Input, Alert, Modal, message, Flex } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/app/hooks';
import { signIn } from '@/feature/user/userSlice';
import * as loginServices from '@/api/loginServices';
import * as userServices from '@/api/userServices';
import type { Result, Role } from '@/api/ResType';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '/logo.png'
export type LoginType = {
    email?: string;
    password?: string;
};
function Login() {
    const [error, setError] = React.useState<Result>();
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [open, setOpen] = React.useState(false);
    const [loadingSubmit, setLoadingSubmit] = React.useState<boolean>(false);
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish: FormProps<LoginType>['onFinish'] = (values) => {
        const login = async () => {
            const resuft = await loginServices.login(values);
            console.log(resuft);
            if (resuft.statusCode == 200) {
                localStorage.setItem('accessToken', resuft.resultObj.accessToken);
                //localStorage.setItem('refreshToken', resuft.resultObj.refreshToken);
                const userResuft = await userServices.getUser();
                if (userResuft.isSuccessed == true) {
                    dispatch(signIn(userResuft.resultObj));
                    const roleAdmin: Role[] = ['admin', 'sale'];
                    console.log(roleAdmin.indexOf(userResuft.resultObj.roles[0]));
                    if (roleAdmin.indexOf(userResuft.resultObj.roles[0]) >= 0) {
                        Navigate('/admin');
                    } else {
                        Navigate(`/`);
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
    const onFinishForgot: FormProps<LoginType>['onFinish'] = async (values) => {
        setLoadingSubmit(true);
        if (values.email != undefined) {
            const res = await userServices.forgotPass(values.email);
            if (res.isSuccessed == true) {
                setLoadingSubmit(false);
                messageApi.open({
                    type: 'success',
                    content: res.resultObj,
                });
                setOpen(false);
            } else {
                setLoadingSubmit(false);
                messageApi.open({
                    type: 'error',
                    content: res.message,
                });
            }
        }
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
                <h2 style={{ textAlign: 'center' }}>
                    <img width={100} height={100} src={Logo} alt='la'/>
                </h2>
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
                        <Flex justify="space-between">
                            <div>
                                <Link to="/auth/register">
                                    <Button type="link">Register now!</Button>
                                </Link>
                            </div>

                            <Button
                                onClick={() => {
                                    setOpen(true);
                                }}
                                type="link"
                            >
                                Forgot password
                            </Button>
                        </Flex>
                    </Form.Item>
                </Form>
            </div>
            <Modal
                style={{ width: 300 }}
                title="Forgot password"
                open={open}
                //onOk={handleOk}
                //confirmLoading={confirmLoading}
                onCancel={() => {
                    setOpen(false);
                }}
                footer=""
            >
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Form
                        name="basic"
                        style={{ maxWidth: 600, width: 350, maxHeight: 500, marginTop: '15px' }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishForgot}
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
                        <Form.Item>
                            <Button loading={loadingSubmit} type="primary" htmlType="submit" block>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
            {contextHolder}
        </div>
    );
}

export default Login;
