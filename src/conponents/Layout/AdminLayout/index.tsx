/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeaderA ,SiderC} from '../components';
import { Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
import './style.scss';
function AdminLayout({ children }:any){
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <SiderC/>
            <Layout>
                <HeaderA />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminLayout
