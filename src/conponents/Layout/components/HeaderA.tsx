/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Space } from 'antd';
import {  Layout,  theme, Avatar, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useAppSelector ,useAppDispatch} from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import type { MenuProps } from 'antd';
const { Header } = Layout;
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { loadUser } from '@/app/feature/user/action';
function HeaderA() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser).data;
    const dispatch = useAppDispatch()
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const items: MenuProps['items'] = [
        {
            label: <a href="https://www.antgroup.com">Setting</a>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: (
                <a
                    onClick={() => {
                        Logout();
                    }}
                >
                    Logout
                </a>
            ),
            key: '3',
        },
    ];
    const Logout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken != null) {
            localStorage.removeItem('accessToken');
            dispatch(loadUser())
            Navigate('/auth/login');
        }
    };
    return (
        <Header
            style={{
                padding: 24,
                background: colorBgContainer,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end',
            }}
        >
            <Dropdown menu={{ items }} trigger={['hover']}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <Avatar size="large" icon={<UserOutlined />} />
                        <div>{user?.userName}</div>
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </Header>
    );
}

export default HeaderA;