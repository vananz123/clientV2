
import { Layout, theme } from 'antd';
const { Content, Header, } = Layout;
import { Outlet } from 'react-router-dom';
function Loading({ children }: any) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout>
            <Layout>
                <Header style={{ background: colorBgContainer,}}></Header>
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Loading;