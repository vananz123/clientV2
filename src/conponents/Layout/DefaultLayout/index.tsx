import { PhoneOutlined } from '@ant-design/icons';
import { HeaderC, FooterC ,SiderC} from '../components';
import { Avatar, Layout, theme } from 'antd';
const { Content } = Layout;
import { Outlet } from 'react-router-dom';
function DefaultLayout({ children }: any) {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div>
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
            <div style={{
                position:'fixed',
                bottom:20,
                right:20,
                cursor:'pointer'
            }}>
                <Avatar size={45} icon={<PhoneOutlined/>}/>
            </div>
        </div>
    );
}

export default DefaultLayout;