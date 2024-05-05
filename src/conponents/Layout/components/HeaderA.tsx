/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Tooltip, Input, Space, Image } from 'antd';
import { Flex, Layout, Menu, theme, Badge, Avatar, Dropdown } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useAppSelector ,useAppDispatch} from '@/app/hooks';
import { selectUser, selectStatus ,signOut} from '@/feature/user/userSlice';
import * as loginServices from '@/api/loginServices';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import React, { useEffect, useState } from 'react';
const { Header, Content } = Layout;
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
function HeaderA() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch()
    const {
        token: { colorBgContainer, borderRadiusLG },
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
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken != null) {
            localStorage.removeItem('accessToken');
                //localStorage.removeItem('refreshToken');
                dispatch(signOut())
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
            <Dropdown menu={{ items }} trigger={['click']}>
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