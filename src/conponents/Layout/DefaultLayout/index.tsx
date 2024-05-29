
import { HeaderC, FooterC } from '../components';
import {  Layout, theme } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectMode } from '@/app/feature/mode/reducer';
function DefaultLayout() {
    const {colorBg, color} = useAppSelector(selectMode)
    const {
        token: { borderRadiusLG },
    } = theme.useToken();
    return (
        <div>
            <Layout>
                <Layout style={{background:colorBg}}>
                    <HeaderC />
                    <Content
                        style={{
                            marginTop:10,
                            minHeight: 360,
                            background: colorBg,
                            color:color,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                         <Outlet />
                    </Content>
                    <FooterC />
                </Layout>
            </Layout>
        </div>
    );
}

export default DefaultLayout;
