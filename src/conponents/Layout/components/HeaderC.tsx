/* eslint-disable @typescript-eslint/no-unused-vars */
import { Tooltip, Space, Flex, Drawer } from 'antd';
import { Layout, theme, Badge, Avatar, Dropdown } from 'antd';
import { UserOutlined, DownOutlined, ShoppingCartOutlined, BarsOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectUser, signOut } from '@/feature/user/userSlice';
import { selectCart } from '@/feature/cart/cartSlice';
import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
const { Header } = Layout;
import NavC from './NavC';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import SearchC from '@/conponents/SearchC';
import Logo2 from '/logo.png';
import React from 'react';
function HeaderC() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser);
    const cart = useAppSelector(selectCart);
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();
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
        if (accessToken != null) {
            localStorage.removeItem('accessToken');
            dispatch(signOut());
            Navigate('/auth/login');
        }
    };
    const [open, setOpen] = React.useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const containerStyle: React.CSSProperties = {
        position: 'relative',
        height: 200,
        padding: 48,
        overflow: 'hidden',
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };
    return (
        <Header style={{padding:0, backgroundColor: token.colorBgContainer }}>
            <div className="header-container">
                <Flex  wrap="wrap" justify="space-between">
                    <div className="header-container__bars">
                        <BarsOutlined onClick={() => showDrawer()} />
                    </div>
                    <div className="header-container__nav">
                        <NavC />
                    </div>
                    <div className="header-container__logo">
                        <a href="/">
                            <img style={{ width: '100%', height: '100%' }} src={Logo2} />
                        </a>
                    </div>
                    <div className="header-container__user">
                        <Space align="center">
                            <SearchC />
                            {typeof user !== 'undefined' ? (
                                <div style={{ paddingBottom: 5 }}>
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <strong onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
                                            <Space>
                                                <Avatar size="large" icon={<UserOutlined />} />
                                                <div>{user?.userName}</div>
                                           </Space>
                                                 <DownOutlined />
                                        </strong>
                                    </Dropdown>
                                    <Link to={`/cart`} style={{ marginLeft: 5, marginBottom: 5 }}>
                                        <Badge count={cart.items.length} showZero>
                                            <Avatar size="large" icon={<ShoppingCartOutlined />} />
                                        </Badge>
                                    </Link>
                                </div>
                            ) : (
                                <Tooltip placement="bottom" title="Đăng nhập">
                                    <div style={{ paddingBottom: 5 }}>
                                        <Link to={'/auth/login'}>
                                            <Avatar size="large" icon={<UserOutlined />} />
                                        </Link>
                                    </div>
                                </Tooltip>
                            )}
                        </Space>
                    </div>
                </Flex>
            </div>
            <Drawer placement="left" style={containerStyle} closable={true} onClose={onClose} open={open} getContainer={false}>
            <NavC />
            </Drawer>
        </Header>
    );
}

export default HeaderC;
