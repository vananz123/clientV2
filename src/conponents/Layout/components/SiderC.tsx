import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const Navigate = useNavigate();
    const onClick: MenuProps['onClick'] = (e) => {
        Navigate(`/admin/${e.key}`);
    };
    const items: MenuItem[] = [getItem('Dashboard', ''),getItem('Product', 'product'), getItem('Category', 'categories'), getItem('User', 'user')];
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
            <Menu onClick={onClick} theme="dark" mode="inline" defaultSelectedKeys={['product']} items={items} />
        </Sider>
    );
}

export default SiderC;
