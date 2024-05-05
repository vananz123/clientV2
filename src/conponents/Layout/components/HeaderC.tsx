/* eslint-disable @typescript-eslint/no-unused-vars */
import {  Tooltip, Space } from 'antd';
import {  Layout, theme, Badge, Avatar, Dropdown } from 'antd';
import { UserOutlined, DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectUser, signOut } from '@/feature/user/userSlice';
import { selectCart } from '@/feature/cart/cartSlice';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import React from 'react';
const { Header } = Layout;
import NavC from './NavC';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, children?: MenuItem[]): MenuItem {
    return {
        label,
        key,
        children,
    } as MenuItem;
}

import { useNavigate } from 'react-router-dom';
import './style.scss';
import SearchC from '@/conponents/SearchC';
import { Product } from '@/type';
function HeaderC() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const cart = useAppSelector(selectCart);
    const [data, setData] = React.useState<Product[]>();
    const dispatch = useAppDispatch();

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const items: MenuProps['items'] = [
        {
            label: <Link to={'/profile'}>Profile</Link>,
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
        //const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken != null) {
            localStorage.removeItem('accessToken');
            //localStorage.removeItem('refreshToken');
            dispatch(signOut());
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
            <NavC></NavC>
            <Space align="center">
                <SearchC typeSearch={1} onSetState={setData} />
                {typeof user !== 'undefined' ? (
                    <div style={{paddingBottom:5}}>
                        <Dropdown menu={{ items }} trigger={['click']}>
                            <strong onClick={(e) => e.preventDefault()} style={{cursor:'pointer'}}>
                                <Space>
                                    <Avatar size="large" icon={<UserOutlined />} />
                                    <div>{user?.userName}</div>
                                    <DownOutlined />
                                </Space>
                            </strong>
                        </Dropdown>
                        <Link to={`/cart`} style={{marginLeft:5,marginBottom:5}}>
                            <Badge count={cart.items.length} showZero>
                                <Avatar size="large" icon={<ShoppingCartOutlined />} />
                            </Badge>
                        </Link>
                    </div>
                ) : (
                    <Tooltip placement='bottom' title="Đăng nhập">
                        <div style={{paddingBottom:5}}>
                            <Link to={'/auth/login'}>
                                <Avatar size="large" icon={<UserOutlined />} />
                            </Link>
                        </div>
                    </Tooltip>
                )}
            </Space>
        </Header>
    );
}

export default HeaderC;
