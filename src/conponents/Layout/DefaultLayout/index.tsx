import { HeaderC, FooterC ,SiderC} from '../components';
import { Layout, theme } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';
function DefaultLayout({ children }: any) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Layout>
                <HeaderC />
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
                <FooterC />
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;