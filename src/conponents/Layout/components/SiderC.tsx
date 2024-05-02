import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
function SiderC() {
    let loca = useLocation()
    const arr = [loca.pathname]
    console.log(arr)
    const Navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        Navigate(e.key);
    };
    const items: MenuItem[] = [getItem('Dashboard', '/admin/dashboard'),getItem('Product', '/admin/product'), getItem('Category', '/admin/categories'), getItem('Order', '/admin/order'), getItem('Promotion', '/admin/promotion'), getItem('User', '/admin/user')];
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <div className="demo-logo-vertical" />
            <Menu onClick={onClick} theme="dark" mode="inline" selectedKeys={arr} items={items} />
        </Sider>
    );
}

export default SiderC;
